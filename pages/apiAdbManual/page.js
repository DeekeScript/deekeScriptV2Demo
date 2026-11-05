Page({
  data: {
    result: '请先确认自动配对已试过且失败'
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
    var self = this;
    Dialogs.confirm(
      '手动扫描配对',
      '请确认已试过「Adb 无线调试」自动配对。\n' +
        '接下来在通知栏逐条回复，不要切回本应用。\n\n' +
        '1. 打开无线调试 →「使用配对码配对设备」\n' +
        '2. 通知里回复【配对端口】和【6 位码】\n' +
        '3. 关掉配对弹窗，在主界面抄【连接端口】（IP:端口 冒号后）\n' +
        '两个端口不是同一个。',
      function (ok) {
        if (!ok) {
          return;
        }
        var opened = false;
        function ask(title, content, hint) {
          return App.notifyInput(title, content, hint, function () {
            if (!opened) {
              opened = true;
              Adb.openWirelessDebuggingSettings();
            }
          });
        }
        try {
          var pairPort = ask('配对端口', '配对码弹窗上的端口。点通知「输入」回复。', '配对端口');
          if (!pairPort) {
            self.setData({ result: '已取消：未填配对端口' });
            return;
          }
          var pairCode = ask('6 位配对码', '配对码弹窗上的 6 位数字。', '6 位配对码');
          if (!pairCode) {
            self.setData({ result: '已取消：未填配对码' });
            return;
          }
          var connectPort = ask(
            '连接端口',
            '关掉配对弹窗，看无线调试主界面 IP:端口 冒号后面的数字。',
            '连接端口'
          );
          if (!connectPort) {
            self.setData({ result: '已取消：未填连接端口' });
            return;
          }
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
