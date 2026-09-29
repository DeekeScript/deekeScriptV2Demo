var permission = require('../../common/permission.js');

Page({
  data: {
    perm: '-',
    listening: '未监听',
    latest: '(空)',
    status: 'NotificationBridge'
  },
  onUnload() { this.onStop(); },
  onHide() { this.onStop(); },
  onShow() { this.onCheck(); },
  onCheck() {
    var ok = false;
    try { ok = !!Access.hasNotificationAccess(); } catch (e) {}
    this.setData({ perm: ok ? '已开启' : '未开启' });
  },
  onRequest() {
    permission.ensureNotification();
    this.onCheck();
  },
  onStart() {
    if (!Access.hasNotificationAccess()) {
      this.setData({ status: '请先开启通知读取权限' });
      this.toast('无权限');
      return;
    }
    var that = this;
    try {
      NotificationBridge.startService();
      NotificationBridge.startListening(function (packageName, title, text) {
        that.setData({
          latest: (packageName || '') + ' · ' + (title || '') + ' · ' + (text || ''),
          status: '收到通知 · ' + System.time()
        });
        console.log('notify', packageName, title, text);
      }, function () {});
      this._listening = true;
      this.setData({ listening: '监听中', status: 'startListening 已启动' });
      this.toast('已监听');
    } catch (e) {
      this.setData({ status: '失败: ' + e });
    }
  },
  onStop() {
    if (!this._listening) return;
    try {
      NotificationBridge.stopService();
    } catch (e) {}
    this._listening = false;
    this.setData({ listening: '未监听', status: '已 stopService' });
  }
});
