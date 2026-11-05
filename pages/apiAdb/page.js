Page({
  data: {
    status: '未刷新',
    result: '-'
  },

  onShow() {
    this.onRefresh();
  },

  _adbReady() {
    if (typeof Adb === 'undefined') {
      this.setData({ result: 'Adb 未注入（需 Pro / Android 11+ 包）' });
      return false;
    }
    return true;
  },

  _fmt(obj) {
    if (obj == null) {
      return 'null';
    }
    try {
      if (typeof obj === 'string') {
        return obj;
      }
      var ok = obj.ok;
      var err = obj.error;
      var msg = obj.message;
      var parts = [];
      if (ok !== undefined) {
        parts.push('ok=' + ok);
      }
      if (msg) {
        parts.push('' + msg);
      }
      if (err) {
        parts.push('error=' + err);
      }
      if (obj.pairPort != null) {
        parts.push('pairPort=' + obj.pairPort);
      }
      if (obj.connectPort != null || obj.port != null) {
        parts.push('connectPort=' + (obj.connectPort != null ? obj.connectPort : obj.port));
      }
      if (obj.all) {
        parts.push('all=' + String(obj.all).slice(0, 120));
      }
      if (obj.result && !obj.all) {
        parts.push('result=' + String(obj.result).slice(0, 120));
      }
      return parts.length ? parts.join(' · ') : String(obj);
    } catch (e) {
      return '' + obj;
    }
  },

  _ensureAccessibility() {
    if (typeof Access !== 'undefined' && Access.isAccessibilityServiceEnabled()) {
      return true;
    }
    Dialogs.confirm('提示', '无障碍读码需要开启无障碍服务', function (ok) {
      if (ok && typeof Access !== 'undefined') {
        Access.openAccessibilityServiceSetting();
      }
    });
    return false;
  },

  _readWirelessPairingCode(timeoutMs) {
    timeoutMs = timeoutMs || 30000;
    var end = Date.now() + timeoutMs;
    while (Date.now() < end) {
      var node = UiSelector().textMatches('^[0-9]{6}$').isVisibleToUser(true).findOne(400);
      if (!node) {
        node = UiSelector().textMatches('^[0-9]{3}\\s+[0-9]{3}$').isVisibleToUser(true).findOne(200);
      }
      if (node) {
        return String(node.text()).replace(/\s+/g, '');
      }
      System.sleep(250);
    }
    return null;
  },

  _openPairingDialog() {
    var btn =
      UiSelector().textContains('使用配对码配对设备').isVisibleToUser(true).findOne(1500) ||
      UiSelector().textContains('Pair device with pairing code').isVisibleToUser(true).findOne(800) ||
      UiSelector().descContains('使用配对码配对设备').isVisibleToUser(true).findOne(500);
    if (btn) {
      btn.click();
      System.sleep(800);
      return true;
    }
    return false;
  },

  onGoManual() {
    this.navigate('pages/apiAdbManual');
  },

  onPairAuto() {
    if (!this._adbReady()) {
      return;
    }
    if (!Adb.isSupported()) {
      Dialogs.show('提示', '需要 Android 11 及以上');
      return;
    }
    var self = this;
    Dialogs.confirm(
      '自动配对',
      '将打开无线调试，并在通知栏放一条可回复的通知。\n\n' +
        '1. 点「使用配对码配对设备」\n' +
        '2. 下拉通知，点「输入」，回复 6 位码\n' +
        '不要切回本应用，否则配对弹窗会被关掉。\n' +
        '仍连不上再点「手动配对」。',
      function (ok) {
        if (!ok) {
          return;
        }
        try {
          var code = App.notifyInput(
            '无线调试配对',
            '点「输入」回复 6 位配对码。不要回到 DeekeScript。',
            '6 位配对码',
            function () {
              Adb.openWirelessDebuggingSettings();
            }
          );
          if (!code) {
            self.setData({ result: '已取消' });
            return;
          }
          var r = Adb.pairWithCode(String(code), 120000);
          var tip = r && r.ok ? '' : ' · 仍失败再「Adb 手动配对」';
          self.setData({ result: '自动配对 · ' + self._fmt(r) + tip });
          self.onRefresh();
        } catch (e) {
          self.setData({ result: '' + e + ' · 可改试「Adb 手动配对」' });
        }
      }
    );
  },

  onPairByAccessibility() {
    if (!this._adbReady()) {
      return;
    }
    if (!Adb.isSupported()) {
      Dialogs.show('提示', '需要 Android 11 及以上');
      return;
    }
    if (!this._ensureAccessibility()) {
      this.setData({ result: '请先开启无障碍后再点本按钮' });
      return;
    }
    var self = this;
    Dialogs.confirm(
      '无障碍读码',
      '将打开无线调试页，尽量自动点「使用配对码配对设备」，读取 6 位码后自动配对。',
      function (ok) {
        if (!ok) {
          return;
        }
        try {
          Adb.openWirelessDebuggingSettings();
          System.sleep(1200);
          if (!self._openPairingDialog()) {
            FloatDialogs.toast('请手动点「使用配对码配对设备」');
          }
          var code = self._readWirelessPairingCode(30000);
          if (!code) {
            self.setData({
              result: '没有读到 6 位码。可改用「自动配对」手输，仍失败再「手动配对」。'
            });
            return;
          }
          FloatDialogs.toast('已读到配对码：' + code);
          var r = Adb.pairWithCode(String(code), 120000);
          var tip = r && r.ok ? '' : ' · 仍失败请打开「Adb 手动配对」';
          self.setData({ result: '无障碍读码=' + code + ' · ' + self._fmt(r) + tip });
          self.onRefresh();
        } catch (e) {
          self.setData({ result: '' + e });
        }
      }
    );
  },

  onRefresh() {
    if (!this._adbReady()) {
      this.setData({ status: 'Adb 不可用' });
      return;
    }
    try {
      var supported = !!Adb.isSupported();
      var connected = !!Adb.isConnected();
      var st = Adb.status ? Adb.status() : {};
      var line =
        'supported=' +
        supported +
        ' · connected=' +
        connected +
        ' · host=' +
        (st.host || Adb.getHost()) +
        ' · port=' +
        (st.port || Adb.getPort()) +
        ' · wireless=' +
        st.wirelessDebuggingEnabled +
        ' · adbEnabled=' +
        st.adbEnabled;
      this.setData({ status: line });
    } catch (e) {
      this.setData({ status: '刷新失败: ' + e });
    }
  },

  onOpenWireless() {
    if (!this._adbReady()) {
      return;
    }
    try {
      Adb.openWirelessDebuggingSettings();
      this.setData({ result: '已跳转无线调试设置' });
    } catch (e) {
      this.setData({ result: '' + e });
    }
  },

  onConnectSaved() {
    if (!this._adbReady()) {
      return;
    }
    try {
      var r = Adb.connectSaved();
      this.setData({ result: this._fmt(r) });
      this.onRefresh();
    } catch (e) {
      this.setData({ result: '' + e });
    }
  },

  onDisconnect() {
    if (!this._adbReady()) {
      return;
    }
    try {
      Adb.disconnect();
      this.setData({ result: '已断开' });
      this.onRefresh();
    } catch (e) {
      this.setData({ result: '' + e });
    }
  },

  onShellId() {
    if (!this._adbReady()) {
      return;
    }
    try {
      if (!Adb.isConnected()) {
        this.setData({ result: '未连接，请先本页「自动配对」，或「自动重连」' });
        return;
      }
      var r = Adb.shell('id');
      this.setData({ result: this._fmt(r) });
    } catch (e) {
      this.setData({ result: '' + e });
    }
  },

  onHome() {
    if (!this._adbReady()) {
      return;
    }
    try {
      if (!Adb.isConnected()) {
        this.setData({ result: '未连接' });
        return;
      }
      var r = Adb.home();
      this.setData({ result: this._fmt(r) });
    } catch (e) {
      this.setData({ result: '' + e });
    }
  },

  onHelp() {
    if (!this._adbReady()) {
      return;
    }
    try {
      Adb.help();
      this.setData({ result: '方法列表已按行输出到控制台' });
    } catch (e) {
      this.setData({ result: '' + e });
    }
  },

  onHint() {
    Dialogs.show(
      '说明',
      '【首次】本页「自动配对」只填 6 位码。\n' +
        '在通知栏点「输入」回复，不要分屏，也不要切回本应用。\n' +
        '自动连不上再打开「Adb 手动配对」。\n\n' +
        '【日常】「自动重连」会自己扫描端口。手填端口只在「Adb 手动配对」。'
    );
  }
});
