let permission = require('common/permission.js');
let floatMenu = require('common/floatMenu.js');

let menuState = {};

function statusText(ok) {
  return ok ? '已开启' : '未开启';
}

function countState(n, extra) {
  n = (n - 0) | 0;
  if (n < 1 || n > 5) {
    n = 3;
  }
  var onBg = '#006A65';
  var offBg = '#EEF2F1';
  var onColor = '#FFFFFF';
  var offColor = '#006A65';
  var data = {
    count1Bg: n === 1 ? onBg : offBg,
    count1Color: n === 1 ? onColor : offColor,
    count2Bg: n === 2 ? onBg : offBg,
    count2Color: n === 2 ? onColor : offColor,
    count3Bg: n === 3 ? onBg : offBg,
    count3Color: n === 3 ? onColor : offColor,
    count4Bg: n === 4 ? onBg : offBg,
    count4Color: n === 4 ? onColor : offColor,
    count5Bg: n === 5 ? onBg : offBg,
    count5Color: n === 5 ? onColor : offColor,
    menuCount: n,
    menuStatus: n + ' 个图标'
  };
  if (extra && extra.menuStatus) {
    data.menuStatus = extra.menuStatus;
  }
  if (extra && extra.lastEvent) {
    data.lastEvent = extra.lastEvent;
  }
  return data;
}

Page({
  data: {
    floatStatus: '检测中',
    accessStatus: '检测中',
    ballStatus: '未知',
    menuStatus: '3 个图标',
    lastEvent: '无',
    menuCount: 3,
    count1Bg: '#EEF2F1',
    count1Color: '#006A65',
    count2Bg: '#EEF2F1',
    count2Color: '#006A65',
    count3Bg: '#006A65',
    count3Color: '#FFFFFF',
    count4Bg: '#EEF2F1',
    count4Color: '#006A65',
    count5Bg: '#EEF2F1',
    count5Color: '#006A65'
  },
  onLoad() {
    this.refreshPerm();
    this.bindMenu();
    floatMenu.applyCount(3);
  },
  onShow() {
    this.refreshPerm();
    this.bindMenu();
  },
  refreshPerm() {
    var floatOk = Access.isFloatWindowsEnabled();
    var accessOk = Access.isAccessibilityServiceEnabled();
    this.setData({
      floatStatus: statusText(floatOk),
      accessStatus: statusText(accessOk)
    });
    return floatOk;
  },
  onRefreshPerm() {
    var ok = this.refreshPerm();
    System.toast(ok ? '悬浮窗权限已开启' : '悬浮窗权限未开启');
  },
  ensureFloatPerm() {
    if (Access.isFloatWindowsEnabled()) {
      this.refreshPerm();
      return true;
    }
    Dialogs.confirm('温馨提示', 'Android 未授权悬浮窗时无法展示悬浮球，是否前往系统设置开启？', function (ok) {
      if (ok) {
        Access.openFloatWindowsSetting();
      }
    });
    this.refreshPerm();
    return false;
  },
  onOpenFloatSetting() {
    if (Access.isFloatWindowsEnabled()) {
      System.toast('悬浮窗权限已开启，无需重复授权');
      this.refreshPerm();
      return;
    }
    Dialogs.confirm('温馨提示', '未开启悬浮窗权限时悬浮球无法展示，是否前往系统设置授权？', function (ok) {
      if (ok) {
        Access.openFloatWindowsSetting();
      }
    });
  },
  onShowBall() {
    if (!this.ensureFloatPerm()) {
      return;
    }
    FloatDialogs.setFloatWindowVisible(true);
    this.setData({ ballStatus: '已显示' });
    System.toast('已显示悬浮球');
  },
  onHideBall() {
    if (!this.ensureFloatPerm()) {
      return;
    }
    FloatDialogs.setFloatWindowVisible(false);
    this.setData({ ballStatus: '已隐藏' });
    System.toast('已隐藏悬浮球，可在本页重新显示');
  },
  onEnableClick() {
    if (!this.ensureFloatPerm()) {
      return;
    }
    FloatDialogs.setFloatWindowClickable(true);
    System.toast('悬浮球可点击');
  },
  onDisableClick() {
    if (!this.ensureFloatPerm()) {
      return;
    }
    FloatDialogs.setFloatWindowClickable(false);
    System.toast('悬浮球暂不可点击');
  },
  onStartSample() {
    if (!this.ensureFloatPerm()) {
      return;
    }
    this.bindMenu();
    if (!permission.runScript('tasks/sample.js')) {
      return;
    }
    this.setData({ lastEvent: 'executeScript' });
  },
  onStopAll() {
    Engines.closeAll();
    this.setData({ lastEvent: 'closeAll' });
    System.toast('已停止全部脚本');
  },
  bindMenu() {
    var page = this;
    floatMenu.bind(menuState, function (name) {
      page.setData({ lastEvent: name });
    });
  },
  onBindMenu() {
    this.bindMenu();
    System.toast('已绑定 start / skip / log');
    this.setData({ lastEvent: 'bind' });
  },
  onCollapse() {
    FloatWindow.collapse();
    this.setData({ lastEvent: 'collapse' });
  },
  applyCount(n) {
    n = (n - 0) | 0;
    this.setData(countState(n, { lastEvent: 'setMenus' }));
    if (!this.ensureFloatPerm()) {
      return;
    }
    floatMenu.applyCount(n);
    this.bindMenu();
    System.toast('已换成 ' + n + ' 个图标');
  },
  onCount1() {
    this.applyCount(1);
  },
  onCount2() {
    this.applyCount(2);
  },
  onCount3() {
    this.applyCount(3);
  },
  onCount4() {
    this.applyCount(4);
  },
  onCount5() {
    this.applyCount(5);
  },
  onMenusDefault() {
    this.setData(countState(3, { menuStatus: '入口 JSON', lastEvent: 'setMenus' }));
    if (!this.ensureFloatPerm()) {
      return;
    }
    floatMenu.applyMenus(floatMenu.defaultMenus());
    this.bindMenu();
    System.toast('已恢复 JSON 菜单');
  },
  onMarkSkip() {
    menuState.skipped = true;
    FloatWindow.update('skip', {
      label: '已跳过',
      background: '#E8F5E9'
    });
    this.setData({ lastEvent: 'update' });
    System.toast('已更新跳过图标');
  }
});
