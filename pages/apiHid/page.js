var permission = require('../../common/permission.js');

function readState() {
  var ok = false;
  var err = '';
  var name = '';
  try {
    if (typeof Hid === 'undefined' || !Hid.isConnected) {
      err = 'Hid 未注入';
    } else {
      ok = !!Hid.isConnected();
      if (ok && Hid.getName) {
        name = Hid.getName() || '';
      }
    }
  } catch (e) {
    err = '' + e;
  }
  return { ok: ok, err: err, name: name };
}

Page({
  data: {
    connected: '-',
    name: '-',
    status: 'Hid 需蓝牙 HID 硬件 + hidv3'
  },
  _busy: false,
  onShow() { this.onRefresh(); },
  onRefresh() {
    var state = readState();
    this.setData({
      connected: state.err ? ('探测失败: ' + state.err) : (state.ok ? '已连接' : '未连接'),
      name: state.err ? '-' : (state.name || (state.ok ? '(未命名)' : '-')),
      status: state.err ? state.err : ('isConnected=' + state.ok + ' · ' + System.time())
    });
  },
  onConnect() {
    if (this._busy) {
      this.toast('正在连接');
      return;
    }
    if (!permission.ensureBluetooth()) {
      this.setData({ status: '需要蓝牙权限' });
      return;
    }
    if (typeof Hid === 'undefined' || !Hid.connect) {
      this.setData({ connected: '探测失败: Hid 未注入', status: 'Hid 未注入' });
      return;
    }
    this._busy = true;
    this.showLoading('正在连接 Hid…');
    this.setData({ connected: '连接中…', status: 'Hid.connect() …' });
    var ok = false;
    var err = '';
    try {
      ok = !!Hid.connect();
    } catch (e) {
      err = '' + e;
    }
    this.hideLoading();
    this._busy = false;
    if (err) {
      this.setData({ connected: '连接失败: ' + err, status: err });
      return;
    }
    var state = readState();
    this.setData({
      connected: ok || state.ok ? '已连接' : '未连接',
      name: state.name || (ok || state.ok ? '(未命名)' : '-'),
      status: (ok ? 'connect 成功' : 'connect 失败') + ' · ' + System.time()
    });
    this.toast(ok ? '已连接' : '未连上');
  },
  onDisconnect() {
    var err = '';
    try {
      if (typeof Hid === 'undefined' || !Hid.disconnect) {
        err = 'Hid 未注入';
      } else {
        Hid.disconnect();
      }
    } catch (e) {
      err = '' + e;
    }
    if (err) {
      this.setData({ status: '断开异常: ' + err });
      return;
    }
    this.setData({
      connected: '未连接',
      name: '-',
      status: '已 disconnect · ' + System.time()
    });
  },
  onHint() {
    Dialogs.show(
      '说明',
      'Hid 通过外接蓝牙键鼠发包，不走无障碍手势。\n' +
      '需安装/加载 hidv3 并完成配对。\n' +
      '连接：Hid.connect()。断开：Hid.disconnect()。状态：Hid.isConnected()。'
    );
  }
});
