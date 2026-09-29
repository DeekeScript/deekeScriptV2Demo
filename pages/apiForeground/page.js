Page({
  data: { status: 'ForegroundServiceBridge' },
  onUnload() { this.onStop(); },
  onStart() {
    try {
      ForegroundServiceBridge.setContent('V2 Demo', '接口展厅前台服务示例');
      ForegroundServiceBridge.startService();
      this.setData({ status: 'startService 已调用' });
      this.toast('已启动');
    } catch (e) {
      this.setData({ status: '失败: ' + e });
    }
  },
  onStop() {
    try {
      ForegroundServiceBridge.stopService();
      this.setData({ status: 'stopService 已调用' });
    } catch (e) {
      this.setData({ status: 'stop: ' + e });
    }
  }
});
