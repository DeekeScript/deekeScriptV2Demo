var CUSTOM = 'v2demo_ping';

Page({
  data: {
    log: '(空)',
    observing: '未监听',
    status: '自定义事件用 Events.on / emit；亮灭屏用 screen_on / screen_off'
  },
  onUnload() {
    this.teardown();
  },
  onHide() {
    this.teardown();
  },
  append(line) {
    var prev = this.data.log;
    if (!prev || prev === '(空)') {
      this.setData({ log: line });
      return;
    }
    var next = line + '\n' + prev;
    if (next.length > 400) {
      next = next.substring(0, 400) + '…';
    }
    this.setData({ log: next });
  },
  teardown() {
    try {
      Events.off(CUSTOM);
      Events.off('screen_on');
      Events.off('screen_off');
    } catch (e) {
    }
    this._bound = false;
    this.setData({ observing: '未监听' });
  },
  onBind() {
    if (this._bound) {
      this.toast('已在监听');
      return;
    }
    var that = this;
    Events.on(CUSTOM, function (msg, n) {
      that.append('custom · ' + msg + ' #' + n);
      console.log('events custom', msg, n);
    });
    Events.on('screen_on', function () {
      that.append('screen_on · ' + System.time());
    });
    Events.on('screen_off', function () {
      that.append('screen_off · ' + System.time());
    });
    this._bound = true;
    this._seq = 0;
    this.setData({
      observing: '监听中',
      status: '已 on(v2demo_ping / screen_on / screen_off)'
    });
    this.toast('已绑定');
  },
  onEmit() {
    if (!this._bound) {
      this.toast('请先绑定监听');
      return;
    }
    this._seq = (this._seq || 0) + 1;
    Events.emit(CUSTOM, 'hello', this._seq);
    this.setData({ status: 'Events.emit(' + CUSTOM + ') #' + this._seq });
  },
  onOnce() {
    var that = this;
    Events.once(CUSTOM + '_once', function (msg) {
      that.append('once · ' + msg);
      that.setData({ status: 'Events.once 已触发并自动移除' });
    });
    Events.emit(CUSTOM + '_once', '只响一次');
    this.toast('once 已触发');
  },
  onClear() {
    this.teardown();
    this.setData({
      log: '(空)',
      status: 'Events.off 已清理'
    });
    this.toast('已清理');
  }
});
