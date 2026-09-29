function safe(v) {
  if (v == null) {
    return '-';
  }
  return '' + v;
}

Page({
  data: {
    screen: '-',
    brand: '-',
    model: '-',
    android: '-',
    network: '-',
    battery: '-',
    time: '-',
    clip: '-'
  },
  onLoad() {
    this.refresh();
  },
  onShow() {
    this.refresh();
  },
  refresh() {
    var bat = {};
    try {
      bat = Device.getBattery() || {};
    } catch (e) {
      bat = {};
    }
    var netText = '未联网';
    try {
      if (Device.isNetworkConnected()) {
        netText = safe(Device.getNetworkType()) + ' · ' + safe(Device.getIPAddress());
        try {
          var wifi = Device.getWifiIPAddress();
          if (wifi) netText += ' · wifi ' + wifi;
        } catch (eWifi) {}
      }
    } catch (e2) {
      netText = '读取失败';
    }
    var cpu = '-';
    try { cpu = safe(Device.getCpuAbi()); } catch (e3) {}
    this.setData({
      screen: Device.width() + ' × ' + Device.height() + ' · density ' + Device.pixelDensity(),
      brand: safe(Device.brand()) + ' / ' + safe(Device.manufacturer()),
      model: safe(Device.model()) + (cpu !== '-' ? ' · ' + cpu : ''),
      android: safe(Device.androidVersion()) + ' · SDK ' + safe(Device.sdkInt()),
      network: netText,
      battery: safe(bat.level) + '% · ' + (bat.isCharging ? '充电中' : '未充电'),
      time: safe(System.time()),
      clip: safe(System.getClip())
    });
  },
  onRefresh() {
    this.refresh();
    this.toast('已刷新');
  },
  onSystemToast() {
    System.toast('System.toast · ' + System.time());
  },
  onCopy() {
    var text = [
      'brand=' + Device.brand(),
      'model=' + Device.model(),
      'screen=' + Device.width() + 'x' + Device.height()
    ].join(' ');
    System.setClip(text);
    this.setData({ clip: safe(System.getClip()) });
    this.toast('已写入剪贴板');
  }
});
