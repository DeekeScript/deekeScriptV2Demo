/**
 * 运行条悬浮窗。
 * 文案由任务写入 Storage，这里定时刷到组件上。
 * 点「停止」只写标记。悬浮窗回调不在任务线程，不能在这里 Engines.closeAll()。
 */
var TITLE_KEY = 'run_bar_title';

Page({
  onShow: function () {
    this.watchTitle();
  },
  onClose: function () {
    this.stopWatch();
  },
  watchTitle: function () {
    if (this._timer) {
      return;
    }
    var that = this;
    this._timer = setInterval(function () {
      var title = Storage.get(TITLE_KEY);
      if (!title) {
        return;
      }
      var bar = that.selectComponent('bar');
      if (bar && bar.setData) {
        bar.setData({ title: title });
      }
    }, 300);
  },
  stopWatch: function () {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  },
  onStop: function () {
    Storage.putBoolean('run_bar_stop', true);
  }
});
