/**
 * FloatPage 多开示例：3 个实例共用 floats/status，间隔 800ms。
 * 仅需悬浮窗权限。高度用 200，错开 y，避免叠成「好像只有一个」。
 */

function darkPanel(partial) {
  var count = partial.count != null ? (partial.count - 0) : 0;
  var total = partial.total != null ? (partial.total - 0) : 3;
  var progress = Math.floor((count * 100) / Math.max(1, total));
  return {
    count: count,
    total: total,
    progress: progress,
    text: partial.text || '面板',
    hint: partial.hint || '多开延时',
    status: partial.status || '运行中',
    statusBg: '#3300C853',
    statusColor: '#A5D6A7'
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
  FloatPage.closeAll();
  let specs = [
    { id: 'm1', y: 80, bg: '#000000' },
    { id: 'm2', y: 300, bg: '#062E2B' },
    { id: 'm3', y: 520, bg: '#1A237E' }
  ];
  let w = Math.floor(Device.width() * 0.8);
  let opened = 0;
  for (let i = 0; i < specs.length; i++) {
    let s = specs[i];
    let ok = FloatPage.show(s.id, {
      path: 'status',
      x: Math.floor((Device.width() - w) / 2) + i * 16,
      y: s.y,
      width: w,
      height: 200,
      opacity: 0.55,
      background: s.bg,
      draggable: true
    });
    if (!ok) {
      FloatDialogs.toast('打开 ' + s.id + ' 失败');
      break;
    }
    opened++;
    FloatPage.setData(s.id, darkPanel({
      count: i + 1,
      total: 3,
      text: '面板 ' + s.id,
      hint: '共用 floats/status · 多开',
      status: '运行中'
    }));
    FloatDialogs.toast('已打开 ' + opened + '/3');
    System.sleep(800);
  }
  FloatDialogs.toast(opened > 0 ? ('多开完成：' + opened + ' 个') : '多开失败');
  Engines.closeAll();
}
