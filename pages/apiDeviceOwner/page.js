Page({
  data: {
    owner: '-',
    status: 'Device Owner 只读探测（破坏性 API 不演示）'
  },
  onShow() { this.onRefresh(); },
  onRefresh() {
    var ok = false;
    try { ok = !!DevicePolicy.isDeviceOwner(); } catch (e) {}
    this.setData({
      owner: ok ? '是 Device Owner' : '否（普通安装）',
      status: 'isDeviceOwner=' + ok + ' · ' + System.time()
    });
  },
  onHint() {
    Dialogs.show(
      '说明',
      'DevicePolicy / DeviceKiosk / DeviceApp / DeviceHardware 需将本应用设为 Device Owner。\n' +
      '本页仅演示 isDeviceOwner()；锁屏、Kiosk、静默装包等请在正式 DO 环境自行调用。'
    );
  }
});
