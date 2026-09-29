Page({
  data: { ticks: '0', status: 'Threads.create + Threads.sleep' },
  onCreate() {
    if (this._busy) {
      this.toast('已有线程在跑');
      return;
    }
    this._busy = true;
    var that = this;
    var n = 0;
    this.setData({ status: '子线程运行中…', ticks: '0' });
    try {
      Threads.create(function () {
        for (var i = 0; i < 5; i++) {
          Threads.sleep(300);
          n = i + 1;
          console.log('threads tick', n);
        }
      });
      var poll = setInterval(function () {
        that.setData({ ticks: '' + n });
        if (n >= 5) {
          clearInterval(poll);
          that._busy = false;
          that.setData({ status: '子线程已结束', ticks: '' + n });
          that.toast('完成');
        }
      }, 200);
    } catch (e) {
      this._busy = false;
      this.setData({ status: '失败: ' + e });
    }
  },
  onReset() {
    this._busy = false;
    this.setData({ ticks: '0', status: '已重置' });
  }
});
