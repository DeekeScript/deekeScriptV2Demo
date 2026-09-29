function safe(v) {
  if (v == null) {
    return '-';
  }
  return '' + v;
}

Page({
  data: {
    pkg: '-',
    version: '-',
    installed: '-',
    result: '点下方按钮试 App / Intent'
  },
  onLoad() {
    this.refresh();
  },
  refresh() {
    var pkg = App.currentPackageName();
    this.setData({
      pkg: safe(pkg),
      version: safe(App.currentVersionName()) + ' (' + safe(App.currentVersionCode()) + ')',
      installed: App.isAppInstalled(pkg) ? '本 App 已安装（当前运行中）' : '未检测到'
    });
  },
  onRefresh() {
    this.refresh();
    this.toast('已刷新');
  },
  onOpenSetting() {
    var pkg = App.currentPackageName();
    App.openAppSetting(pkg);
    this.setData({ result: '已调用 App.openAppSetting(' + pkg + ')' });
  },
  onOpenUrl() {
    App.openUrl('https://doc.deeke.cn');
    this.setData({ result: '已调用 App.openUrl(https://doc.deeke.cn)' });
  },
  onIntentOpen() {
    Intent.open('https://doc.deeke.cn');
    this.setData({ result: '已调用 Intent.open(文档站 URI)' });
  },
  onIntentSelf() {
    Intent.open();
    this.setData({ result: '已调用 Intent.open() 打开本应用详情' });
  },
  onCheckSettings() {
    var ok = App.isAppInstalled('com.android.settings');
    var ver = '-';
    try { ver = App.getAppVersionName('com.android.settings') || '-'; } catch (e) {}
    this.setData({
      result: 'settings 已安装=' + ok + ' · version=' + ver,
      installed: ok ? 'settings 已安装 · ' + ver : 'settings 未安装'
    });
    this.toast(ok ? '已安装' : '未安装');
  },
  onRegBroadcast() {
    var ACTION = 'top.deeke.script.demo.REFRESH';
    var that = this;
    try {
      Intent.unregisterReceiver(ACTION);
    } catch (e) {}
    try {
      Intent.registerReceiver(ACTION, function () {
        that.setData({ result: '收到广播 ' + ACTION + ' · ' + System.time() });
        that.toast('收到广播');
      });
      this._bcast = ACTION;
      this.setData({ result: '已 registerReceiver(' + ACTION + ')' });
      this.toast('已注册');
    } catch (e2) {
      this.setData({ result: 'registerReceiver 失败: ' + e2 });
    }
  },
  onSendBroadcast() {
    var ACTION = this._bcast || 'top.deeke.script.demo.REFRESH';
    try {
      Intent.sendBroadcast({
        action: ACTION,
        packageName: App.currentPackageName()
      });
      this.setData({ result: '已 sendBroadcast(' + ACTION + ')' });
    } catch (e) {
      this.setData({ result: 'sendBroadcast 失败: ' + e });
    }
  }
});
