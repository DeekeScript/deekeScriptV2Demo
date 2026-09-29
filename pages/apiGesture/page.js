var permission = require('../../common/permission.js');

Page({
  data: {
    screen: '-',
    status: 'Gesture：back / home / recents / 短滑；需无障碍'
  },
  onLoad() { this.onRefresh(); },
  onRefresh() {
    this.setData({
      screen: Device.width() + ' × ' + Device.height()
    });
  },
  _needA11y() {
    if (!permission.ensureAccessibility()) {
      this.setData({ status: '请先开启无障碍' });
      return false;
    }
    return true;
  },
  onBack() {
    if (!this._needA11y()) return;
    try {
      var ok = Gesture.back();
      this.setData({ status: ok === false ? 'back 返回 false' : 'Gesture.back()' });
      this.toast('已返回');
    } catch (e) {
      this.setData({ status: 'back 异常: ' + e });
    }
  },
  onHome() {
    if (!this._needA11y()) return;
    try {
      var ok = Gesture.home();
      this.setData({ status: ok === false ? 'home 返回 false' : 'Gesture.home()' });
      this.toast('已回桌面');
    } catch (e) {
      this.setData({ status: 'home 异常: ' + e });
    }
  },
  onRecents() {
    if (!this._needA11y()) return;
    try {
      var ok = Gesture.recents();
      this.setData({ status: ok === false ? 'recents 返回 false' : 'Gesture.recents()' });
      this.toast('多任务');
    } catch (e) {
      this.setData({ status: 'recents 异常: ' + e });
    }
  },
  onSwipeUp() {
    if (!this._needA11y()) return;
    try {
      var cx = Math.floor(Device.width() / 2);
      var y1 = Math.floor(Device.height() * 0.65);
      var y2 = Math.floor(Device.height() * 0.45);
      var ok = Gesture.swipe(cx, y1, cx, y2, 280);
      this.setData({ status: ok === false ? 'swipe 返回 false' : 'swipe 上滑短距' });
      this.toast('已上滑');
    } catch (e) {
      this.setData({ status: 'swipe 异常: ' + e });
    }
  },
  onPress() {
    if (!this._needA11y()) return;
    try {
      var x = Math.floor(Device.width() / 2);
      var y = Math.floor(Device.height() * 0.4);
      var ok = Gesture.press(x, y, 400);
      this.setData({ status: ok === false ? 'press 返回 false' : 'press 中心 400ms' });
      this.toast('已长按');
    } catch (e) {
      this.setData({ status: 'press 异常: ' + e });
    }
  }
});
