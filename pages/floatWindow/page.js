let permission = require('common/permission.js');
let floatMenu = require('common/floatMenu.js');

let menuState = {};

function statusText(ok) {
  return ok ? '已开启' : '未开启';
}

Page({
  data: {
    floatStatus: '检测中',
    accessStatus: '检测中',
    ballStatus: '未知',
    menuStatus: '入口 JSON',
    lastEvent: '无',
    menuCount: 3
  },
  onLoad() {
    this.refreshPerm();
    this.bindMenu();
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
    if (!this.ensureFloatPerm()) {
      return;
    }
    floatMenu.applyCount(n);
    this.bindMenu();
    this.setData({
      menuCount: n,
      menuStatus: n + ' 个图标',
      lastEvent: 'setMenus'
    });
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
    if (!this.ensureFloatPerm()) {
      return;
    }
    floatMenu.applyMenus(floatMenu.defaultMenus());
    this.bindMenu();
    this.setData({ menuStatus: '入口 JSON', lastEvent: 'setMenus' });
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
