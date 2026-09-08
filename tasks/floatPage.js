/**
 * FloatPage 示例任务：显示悬浮窗并推送进度。
 * 仅需悬浮窗权限（不要求无障碍）。
 *
 * 布尔标记必须用 putBoolean / getBoolean：
 * put(false) 会存成字符串 "false"，在 JS 里非空串为真，!Storage.get(...) 会让循环一次都不跑。
 */

function panelData(count, total, status, hint) {
  var progress = Math.floor((count * 100) / total);
  if (progress > 100) {
    progress = 100;
  }
  var running = status === '运行中';
  var paused = status === '已暂停';
  var done = status === '已结束';
  return {
    count: count,
    total: total,
    progress: progress,
    text: status === '运行中' ? '正在执行任务' : status === '已结束' ? '本次运行完成' : status,
    hint: hint,
    status: status,
    statusBg: running ? '#3300C853' : paused ? '#33FFB300' : done ? '#334CAF50' : '#33FFFFFF',
    statusColor: running ? '#A5D6A7' : paused ? '#FFE082' : done ? '#C8E6C9' : '#EEEEEE'
  };
}

if (!Access.isFloatWindowsEnabled()) {
  Dialogs.confirm('提示', '悬浮窗需要系统悬浮窗权限', function (ok) {
    if (ok) {
      Access.openFloatWindowsSetting();
    }
  });
  Engines.closeAll();
} else {
  Storage.putBoolean('float_pause', false);
  var total = 30;
  var w = Math.floor(Device.width() * 0.8);
  var ok = FloatPage.show('status', {
    x: Math.floor((Device.width() - w) / 2),
    y: 160,
    width: w,
    height: 500,
    opacity: 0.5,
    background: '#000000',
    draggable: true,
    focusable: false
  });
  if (!ok) {
    FloatDialogs.toast('打开 FloatPage 失败（权限或目录）');
    Engines.closeAll();
  } else {
    FloatDialogs.toast('悬浮窗已打开，可拖顶部细条');
    FloatPage.setData('status', panelData(0, total, '运行中', '点「暂停」或悬浮球停止'));
    var i = 0;
    while (i < total && !Storage.getBoolean('float_pause')) {
      i++;
      FloatPage.setData('status', panelData(i, total, '运行中', '点「暂停」或悬浮球停止'));
      System.sleep(1000);
    }
    var paused = Storage.getBoolean('float_pause');
    FloatPage.setData('status', panelData(i, total, paused ? '已暂停' : '已结束',
      paused ? '已手动暂停' : '任务结束，面板即将关闭'));
    System.sleep(1000);
    FloatPage.close('status');
    Engines.closeAll();
  }
}
