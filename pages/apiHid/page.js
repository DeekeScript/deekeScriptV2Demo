Page({
  data: {
    connected: '-',
    status: 'Hid 需蓝牙 HID 硬件 + hidv3'
  },
  onShow() { this.onRefresh(); },
  onRefresh() {
    var ok = false;
    var err = '';
    try {
      if (typeof Hid !== 'undefined' && Hid.isConnected) {
        ok = !!Hid.isConnected();
      } else {
        err = 'Hid 未注入';
      }
    } catch (e) {
      err = '' + e;
    }
    this.setData({
      connected: err ? ('探测失败: ' + err) : (ok ? '已连接' : '未连接'),
      status: err ? err : ('isConnected=' + ok + ' · ' + System.time())
    });
  },
  onHint() {
    Dialogs.show(
      '说明',
      'Hid 通过外接蓝牙键鼠发包，不走无障碍手势。\n' +
      '需安装/加载 hidv3 并完成配对。本页只查 isConnected；点击/找图封装见文档 Hid 方法。'
    );
  }
});
