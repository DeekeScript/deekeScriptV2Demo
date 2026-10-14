/**
 * 运行条示例：自定义组件 components/runBar，用 FloatPage 画出来。
 * 1. 任务一开始显示 floats/runBar
 * 2. 自己跑完，或看到停止标记后 Engines.closeAll()，都会触发 script_stop
 * 3. script_stop 里关闭运行条，并提示「任务已关闭」
 * 点「停止」只写 Storage。悬浮窗回调不在任务线程，Engines.closeAll() 在那里无效。
 */
var TITLE_KEY = 'run_bar_title';
var STOP_KEY = 'run_bar_stop';

function stopped() {
  return Storage.getBoolean(STOP_KEY);
}

function waitOrStop(ms) {
  var left = ms;
  while (left > 0 && !stopped()) {
    var step = left > 200 ? 200 : left;
    System.sleep(step);
    left = left - step;
  }
  return stopped();
}

if (!Access.isFloatWindowsEnabled()) {
  Dialogs.confirm('提示', '运行条需要系统悬浮窗权限', function (ok) {
    if (ok) {
      Access.openFloatWindowsSetting();
    }
  });
  Engines.closeAll();
} else {
  Storage.putBoolean(STOP_KEY, false);
  Storage.put(TITLE_KEY, '任务正在执行');
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
    while (i < steps.length && !stopped()) {
      Storage.put(TITLE_KEY, steps[i].title);
      if (waitOrStop(steps[i].ms)) {
        break;
      }
      i++;
    }
    Engines.closeAll();
  }
}
