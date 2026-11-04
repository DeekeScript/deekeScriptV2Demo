Page({
  data: {
    result: '尚未操作'
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
      var parts = [];
      if (obj.ok !== undefined) {
        parts.push('ok=' + obj.ok);
      }
      if (obj.message) {
        parts.push('' + obj.message);
      }
      if (obj.error) {
        parts.push('error=' + obj.error);
      }
      if (obj.pairPort != null) {
        parts.push('pairPort=' + obj.pairPort);
      }
      if (obj.connectPort != null || obj.port != null) {
        parts.push('connectPort=' + (obj.connectPort != null ? obj.connectPort : obj.port));
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

  onPairSplitScreen() {
    if (!this._adbReady()) {
      return;
    }
    if (!Adb.isSupported()) {
      Dialogs.show('提示', '需要 Android 11 及以上');
      return;
    }
    var self = this;
    Dialogs.confirm(
      '分屏手输',
      '1. 打开无线调试 →「使用配对码配对设备」，弹窗别关。\n' +
        '2. 分屏：左边留设置页看 6 位码，右边回到本应用。\n' +
        '3. 点确定后只输入 6 位码。',
      function (ok) {
        if (!ok) {
          return;
        }
        Adb.openWirelessDebuggingSettings();
        var code = Dialogs.input('6 位配对码（请分屏看着弹窗填写）', '');
        if (!code) {
          self.setData({ result: '已取消' });
          return;
        }
        try {
          var r = Adb.pairWithCode(String(code), 120000);
          self.setData({ result: '分屏手输 · ' + self._fmt(r) });
        } catch (e) {
          self.setData({ result: '' + e });
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
      '无障碍读码配对',
      '将打开无线调试页，尽量自动点「使用配对码配对设备」。\n' +
        '请保持配对弹窗可见；脚本会读取界面上的 6 位数字并调用 Adb.pairWithCode。',
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
              result: '没有读到 6 位码。可改分屏手输，或到「Adb 无线调试」手填参数。'
            });
            return;
          }
          FloatDialogs.toast('已读到配对码：' + code);
          var r = Adb.pairWithCode(String(code), 120000);
          self.setData({ result: '无障碍读码=' + code + ' · ' + self._fmt(r) });
        } catch (e) {
          self.setData({ result: '' + e });
        }
      }
    );
  },

  onGoAdb() {
    this.navigate('pages/apiAdb');
  }
});
