Page({
  data: { status: '点按钮输出到控制台' },
  onLog() {
    console.log('apiConsole log', System.time());
    this.setData({ status: '已 console.log' });
    this.toast('已 log');
  },
  onLevels() {
    console.info('apiConsole info');
    console.warn('apiConsole warn');
    console.error('apiConsole error');
    this.setData({ status: '已 info / warn / error' });
    this.toast('已分级输出');
  },
  onShow() {
    console.show();
    console.info('打开控制台 · apiConsole');
    this.setData({ status: 'console.show()' });
  },
  onHide() {
    console.hide();
    this.setData({ status: 'console.hide()' });
  }
});
