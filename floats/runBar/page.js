/**
 * 运行条悬浮窗。
 * 文案由任务 FloatPage.setData 写入本页 data。
 * 点停止先发 run_stop，再 FloatWindow.stopTask()。
 * 悬浮窗回调不在任务线程，这里不能 Engines.closeAll()。
 */
Page({
  data: {
    title: '任务正在执行',
    dotOpacity: 1
  },

  onShow: function () {
    this.blink();
  },

  onClose: function () {
    this.stopBlink();
  },

  blink: function () {
    if (this._dotTimer) {
      return;
    }
    var that = this;
    var bright = true;
    this._dotTimer = setInterval(function () {
      bright = !bright;
      that.setData({ dotOpacity: bright ? 1 : 0.45 });
    }, 700);
  },

  stopBlink: function () {
    if (this._dotTimer) {
      clearInterval(this._dotTimer);
      this._dotTimer = null;
    }
  },

  onStop: function () {
    if (this._stopped) {
      return;
    }
    this._stopped = true;
    this.stopBlink();
    Events.emit('run_stop');
    FloatWindow.stopTask();
  }
});
