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

  onGoConnect() {
    this.navigate('pages/apiAdbConnect');
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

  onPairManual() {
    if (!this._adbReady()) {
      return;
    }
    if (!Adb.isSupported()) {
      Dialogs.show('提示', '需要 Android 11 及以上');
      return;
    }
    Adb.openWirelessDebuggingSettings();
    var self = this;
    Dialogs.confirm(
      '手动填全部参数',
      '自动发现失败时再用。\n' +
        '1. 打开无线调试\n' +
        '2. 点「使用配对码配对设备」：抄【配对端口】和【6位码】（建议分屏，见「Adb 连接方法」）\n' +
        '3. 回到无线调试主界面：抄【IP:端口】里冒号后面的【连接端口】\n' +
        '两个端口不是同一个。',
      function (ok) {
        if (!ok) {
          return;
        }
        var pairPort = Dialogs.input('配对端口（配对码弹窗上的端口）', '');
        if (!pairPort) {
          self.setData({ result: '已取消：未填配对端口' });
          return;
        }
        var pairCode = Dialogs.input('6 位配对码', '');
        if (!pairCode) {
          self.setData({ result: '已取消：未填配对码' });
          return;
        }
        var connectPort = Dialogs.input('连接端口（主界面 IP:端口 冒号后）', String(Adb.getPort() || ''));
        if (!connectPort) {
          self.setData({ result: '已取消：未填连接端口' });
          return;
        }
        try {
          var r = Adb.pairWithCode({
            code: String(pairCode),
            pairPort: Number(pairPort),
            connectPort: Number(connectPort),
            timeoutMs: 15000
          });
          self.setData({
            result:
              '手动完成 · ' +
              self._fmt(r) +
              ' · pairPort=' +
              pairPort +
              ' connectPort=' +
              connectPort
          });
          self.onRefresh();
        } catch (e) {
          self.setData({ result: '' + e });
        }
      }
    );
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

  onConnectPort() {
    if (!this._adbReady()) {
      return;
    }
    var port = Dialogs.input('连接端口（无线调试主界面 IP:端口 冒号后）', String(Adb.getPort() || ''));
    if (!port) {
      this.setData({ result: '已取消' });
      return;
    }
    try {
      var r = Adb.connect(Number(port));
      this.setData({ result: this._fmt(r) + ' · port=' + port });
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
        this.setData({ result: '未连接，请先到「Adb 连接方法」完成首次配对，或本页历史端口重连' });
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
      '【首次怎么连】请打开「Adb 连接方法」：分屏手输 6 位码，或无障碍自动读码。\n\n' +
        '【本页】日常历史端口重连；自动发现失败再「手动填全部参数」。\n' +
        '配对端口 = 配对码弹窗上的端口；连接端口 = 主界面「IP:端口」冒号后。\n' +
        '文档：Adb 连接方法 / 开启与配对 / Adb 方法。'
    );
  }
});
