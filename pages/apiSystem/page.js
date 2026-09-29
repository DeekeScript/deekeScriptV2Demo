var permission = require('../../common/permission.js');

function safe(v) {
  if (v == null) return '-';
  return '' + v;
}

Page({
  data: {
    locale: '-',
    volume: '-',
    pkg: '-',
    a11yMode: '-',
    keepOn: '未设置',
    timeWin: '未操作',
    status: 'System 振动 / 常亮 / 时间窗 / 包名'
  },
  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },
  refresh() {
    var loc = '-';
    try {
      var info = System.getLocaleInfo() || {};
      loc = safe(info.language) + ' / ' + safe(info.country);
    } catch (e) { loc = '读取失败'; }
    var vol = '-';
    try {
      vol = System.getVolume() + ' / max ' + System.getMaxVolume();
    } catch (e2) { vol = '读取失败'; }
    var pkg = '-';
    try {
      pkg = safe(System.currentPackage()) + '\n' + safe(System.currentActivity());
    } catch (e3) { pkg = '读取失败'; }
    var mode = '-';
    try {
      mode = safe(System.getAccessibilityMode()) + (System.isAccessibilityQuick() ? ' · quick' : '');
    } catch (e4) { mode = '读取失败'; }
    this.setData({ locale: loc, volume: vol, pkg: pkg, a11yMode: mode });
  },
  onRefresh() { this.refresh(); this.toast('已刷新'); },
  onVibrate() {
    System.vibrate(200);
    this.setData({ status: 'System.vibrate(200)' });
    this.toast('已振动');
  },
  onKeepOn() {
    System.setKeepScreenOn(true);
    this.setData({ keepOn: '开', status: 'setKeepScreenOn(true)' });
  },
  onKeepOff() {
    System.setKeepScreenOn(false);
    this.setData({ keepOn: '关', status: 'setKeepScreenOn(false)' });
  },
  onTimeShow() {
    System.setTimeWindowShow(true);
    this.setData({
      timeWin: '显示',
      status: 'setTimeWindowShow(true) — 未创建时会先创建再显示'
    });
    this.toast('已显示时间窗');
  },
  onTimeHide() {
    System.setTimeWindowShow(false);
    this.setData({
      timeWin: '隐藏',
      status: 'setTimeWindowShow(false)'
    });
    this.toast('已隐藏时间窗');
  },
  onCaptureHide() {
    if (!permission.ensureScreenCapture()) {
      this.setData({ status: '请先开启录屏权限' });
      return;
    }
    try {
      System.setTimeWindowShow(false);
      var path = Images.capture();
      System.setTimeWindowShow(true);
      this.setData({
        timeWin: '显示',
        status: '截图前隐藏 → capture → 再显示 · ' + (path ? '成功' : '空')
      });
      this.toast(path ? '已截图并恢复' : '截图失败');
    } catch (e) {
      try { System.setTimeWindowShow(true); } catch (e2) {}
      this.setData({ status: '截图流程失败: ' + e });
    }
  }
});
