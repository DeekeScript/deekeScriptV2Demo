function statusText(ok) {
  return ok ? '已开启' : '未开启';
}

function darkPanel(partial) {
  var count = partial.count != null ? (partial.count - 0) : 0;
  var total = partial.total != null ? (partial.total - 0) : 30;
  if (total < 1) {
    total = 1;
  }
  var progress = Math.floor((count * 100) / total);
  if (progress < 0) {
    progress = 0;
  }
  if (progress > 100) {
    progress = 100;
  }
  var status = partial.status || '待命';
  var running = status === '运行中';
  var paused = status === '已暂停';
  var done = status === '已结束';
  return {
    count: count,
    total: total,
    progress: progress,
    text: partial.text || status,
    hint: partial.hint || '顶部细条可拖动',
    status: status,
    statusBg: running ? '#3300C853' : paused ? '#33FFB300' : done ? '#334CAF50' : '#33FFFFFF',
    statusColor: running ? '#A5D6A7' : paused ? '#FFE082' : done ? '#C8E6C9' : '#EEEEEE'
  };
}

var demoCount = 0;
var gripOn = true;
var MULTI_IDS = ['m1', 'm2', 'm3', 'status'];

Page({
  data: {
    floatStatus: '检测中',
    panelStatus: '未显示',
    lastEvent: '无',
    demoCount: 0,
    gripOn: true,
    gripBtn: '关手柄',
    gripText: '手柄开'
  },
  onLoad: function () {
    this.refreshPerm();
  },
  onShow: function () {
    this.refreshPerm();
    this.refreshPanel();
  },
  refreshPerm: function () {
    var floatOk = Access.isFloatWindowsEnabled();
    this.setData({
      floatStatus: statusText(floatOk)
    });
    return floatOk;
  },
  refreshPanel: function () {
    var showing = 0;
    var ids = ['m1', 'm2', 'm3', 'status', 'runBar'];
    for (var i = 0; i < ids.length; i++) {
      if (FloatPage.isShowing(ids[i])) {
        showing++;
      }
    }
    var panelStatus = showing > 0 ? ('显示中 ' + showing + '/3') : '未显示';
    if (FloatPage.exists('status') && !FloatPage.isShowing('status') && showing === 0) {
      panelStatus = '已隐藏';
    }
    this.setData({
      panelStatus: panelStatus,
      gripBtn: gripOn ? '关手柄' : '开手柄',
      gripText: gripOn ? '手柄开' : '手柄关'
    });
  },
  onRefreshPerm: function () {
    var ok = this.refreshPerm();
    this.refreshPanel();
    System.toast(ok ? '悬浮窗权限已开启' : '悬浮窗权限未开启');
  },
  ensureFloatPerm: function () {
    if (Access.isFloatWindowsEnabled()) {
      this.refreshPerm();
      return true;
    }
    Dialogs.confirm('提示', '悬浮窗需要系统悬浮窗权限，是否前往系统设置开启？', function (ok) {
      if (ok) {
        Access.openFloatWindowsSetting();
      }
    });
    this.refreshPerm();
    return false;
  },
  onOpenFloatSetting: function () {
    if (Access.isFloatWindowsEnabled()) {
      System.toast('悬浮窗权限已开启');
      this.refreshPerm();
      return;
    }
    Dialogs.confirm('提示', '未开启悬浮窗权限时无法显示悬浮窗，是否前往授权？', function (ok) {
      if (ok) {
        Access.openFloatWindowsSetting();
      }
    });
  },
  showOne: function (id, index) {
    var w = Math.floor(Device.width() * 0.8);
    return FloatPage.show(id, {
      x: Math.floor((Device.width() - w) / 2) + index * 18,
      y: 120 + index * 72,
      width: w,
      height: 500,
      opacity: 0.5,
      background: index === 1 ? '#062E2B' : index === 2 ? '#1A237E' : '#000000',
      draggable: gripOn,
      focusable: false
    });
  },
  runFloatScript: function (jsFile) {
    if (!this.ensureFloatPerm()) {
      return false;
    }
    Engines.executeScript(jsFile);
    return true;
  },
  onShowPanel: function () {
    if (!this.ensureFloatPerm()) {
      return;
    }
    var ok = this.showOne('status', 0);
    if (!ok) {
      System.toast('打开失败：检查权限与 floats/status');
      this.setData({ lastEvent: 'show-fail' });
      this.refreshPanel();
      return;
    }
    FloatPage.setData('status', darkPanel({
      count: demoCount,
      text: '任务面板',
      hint: '顶部细条可拖动',
      status: '待命'
    }));
    this.setData({
      lastEvent: 'show',
      demoCount: demoCount
    });
    this.refreshPanel();
    System.toast('已显示 FloatPage');
  },
  onHidePanel: function () {
    FloatPage.hide('status');
    this.setData({ lastEvent: 'hide' });
    this.refreshPanel();
    System.toast('已隐藏（实例保留）');
  },
  onClosePanel: function () {
    FloatPage.close('status');
    demoCount = 0;
    this.setData({ lastEvent: 'close', demoCount: 0 });
    this.refreshPanel();
    System.toast('已关闭面板');
  },
  onCloseAll: function () {
    FloatPage.closeAll();
    demoCount = 0;
    this.setData({ lastEvent: 'closeAll', demoCount: 0 });
    this.refreshPanel();
    System.toast('已关闭全部');
  },
  onBumpData: function () {
    if (!this.ensureFloatPerm()) {
      return;
    }
    if (!FloatPage.exists('status')) {
      System.toast('请先点「显示」打开悬浮窗');
      this.setData({ lastEvent: 'setData-skip' });
      return;
    }
    if (!FloatPage.isShowing('status')) {
      System.toast('面板已隐藏，请先点「显示」');
      this.setData({ lastEvent: 'setData-hidden' });
      return;
    }
    demoCount = demoCount + 1;
    if (demoCount > 30) {
      demoCount = 30;
    }
    FloatPage.setData('status', darkPanel({
      count: demoCount,
      text: '正在执行任务',
      hint: '来自展厅页 setData +1',
      status: '运行中'
    }));
    this.setData({
      demoCount: demoCount,
      lastEvent: 'setData'
    });
    this.refreshPanel();
    System.toast('count = ' + demoCount);
  },
  onToggleGrip: function () {
    if (!this.ensureFloatPerm()) {
      return;
    }
    var any = false;
    for (var i = 0; i < MULTI_IDS.length; i++) {
      if (FloatPage.exists(MULTI_IDS[i])) {
        any = true;
        break;
      }
    }
    if (!any) {
      System.toast('请先显示悬浮窗');
      return;
    }
    gripOn = !gripOn;
    for (var j = 0; j < MULTI_IDS.length; j++) {
      if (FloatPage.exists(MULTI_IDS[j])) {
        FloatPage.setDraggable(MULTI_IDS[j], gripOn);
      }
    }
    this.setData({
      gripOn: gripOn,
      gripBtn: gripOn ? '关手柄' : '开手柄',
      gripText: gripOn ? '手柄开' : '手柄关',
      lastEvent: gripOn ? 'setDraggable:true' : 'setDraggable:false'
    });
    System.toast(gripOn ? '手柄已开启' : '手柄已关闭');
  },
  onMultiOpen: function () {
    if (!this.runFloatScript('tasks/floatPageMulti.js')) {
      return;
    }
    this.setData({ lastEvent: 'multi-open' });
    this.refreshPanel();
  },
  onStartSample: function () {
    if (!this.runFloatScript('tasks/floatPage.js')) {
      return;
    }
    this.setData({ lastEvent: 'executeScript' });
    this.refreshPanel();
  },
  onStartRunBar: function () {
    if (!this.runFloatScript('tasks/runBar.js')) {
      return;
    }
    this.setData({ lastEvent: 'runBar' });
    this.refreshPanel();
  },
  onStopAll: function () {
    FloatWindow.stopTask();
    this.setData({ lastEvent: 'stopTask' });
    this.refreshPanel();
    System.toast('已停止项目任务（面板会一并关闭）');
  }
});
