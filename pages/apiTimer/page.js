Page({
  data: {
    ticks: '0',
    running: '未运行',
    status: 'setInterval 每秒 +1；离开页面请 stop'
  },
  onUnload() {
    this.stopTimer();
  },
  onHide() {
    this.stopTimer();
  },
  stopTimer() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    this.setData({ running: '未运行' });
  },
  onStart() {
    if (this._timer) {
      this.toast('已在运行');
      return;
    }
    var that = this;
    var n = parseInt(this.data.ticks, 10) || 0;
    this.setData({ running: '运行中', status: 'setInterval(1000) 已启动' });
    console.log('apiTimer start', n);
    this._timer = setInterval(function () {
      n += 1;
      that.setData({ ticks: '' + n });
      console.log('apiTimer tick', n);
    }, 1000);
    this.toast('已启动');
  },
  onStop() {
    this.stopTimer();
    this.setData({ status: 'clearInterval 已停止' });
    console.log('apiTimer stop');
    this.toast('已停止');
  },
  onReset() {
    this.stopTimer();
    this.setData({ ticks: '0', status: '计数已归零' });
    console.log('apiTimer reset');
  },
  onShowConsole() {
    console.show();
    console.info('打开控制台窗口 · apiTimer');
    this.toast('已 console.show()');
  }
});
