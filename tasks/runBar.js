/**
 * 运行条示例：用 floats/runBar 画一条贴在状态栏上的胶囊。
 * 1. 任务一开始 FloatPage.show，再用 FloatPage.setData 改文案
 * 2. 点停止发 run_stop，并 FloatWindow.stopTask() 结束整项任务
 * 3. script_stop 里关闭运行条，并提示「任务已关闭」
 * 悬浮窗回调不在任务线程，不能在那里 Engines.closeAll()。
 */
var stopped = false;

function waitOrStop(ms) {
  var left = ms;
  while (left > 0 && !stopped) {
    var step = left > 200 ? 200 : left;
    System.sleep(step);
    left = left - step;
  }
  return stopped;
}

if (!Access.isFloatWindowsEnabled()) {
  Dialogs.confirm('提示', '运行条需要系统悬浮窗权限', function (ok) {
    if (ok) {
      Access.openFloatWindowsSetting();
    }
  });
  Engines.closeAll();
} else if (!Access.isAccessibilityServiceEnabled()) {
  Dialogs.confirm('提示', '运行条贴在状态栏上，需要开启无障碍才能点击', function (ok) {
    if (ok) {
      Access.openAccessibilityServiceSetting();
    }
  });
  Engines.closeAll();
} else {
  var density = Device.width() / 360;
  if (density < 1) {
    density = 1;
  }
  var w = Math.floor(168 * density);
  var shown = FloatPage.show('runBar', {
    x: Math.floor((Device.width() - w) / 2),
    y: Math.floor(6 * density),
    width: w,
    height: Math.floor(28 * density),
    opacity: 0,
    background: '#00000000',
    draggable: false,
    focusable: false,
    gestureTouchable: false,
    inStatusBar: true
  });
  if (!shown) {
    System.toast('打开运行条失败');
    Engines.closeAll();
  } else {
    Events.on('run_stop', function () {
      stopped = true;
    });
    Events.on('script_stop', function () {
      FloatPage.close('runBar');
      System.toast('任务已关闭');
    });
    var steps = [
      { title: '任务正在执行', ms: 1500 },
      { title: '休眠3秒', ms: 3000 },
      { title: '准备点赞', ms: 1500 }
    ];
    var i = 0;
    while (i < steps.length && !stopped) {
      FloatPage.setData('runBar', { title: steps[i].title });
      if (waitOrStop(steps[i].ms)) {
        break;
      }
      i++;
    }
    Engines.closeAll();
  }
}
