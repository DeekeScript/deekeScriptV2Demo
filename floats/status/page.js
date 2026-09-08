/**
 * 悬浮窗（FloatPage 展厅）。
 * 任务脚本用 FloatPage.setData(id, ...) 更新；按钮通过 Storage 通知任务。
 * 多开时用 FloatPage.selfId() 区分实例。
 */
var TOTAL = 30;

function myId() {
  return FloatPage.selfId() || 'status';
}

function panelState(partial) {
  var count = partial.count != null ? (partial.count - 0) : 0;
  var total = partial.total != null ? (partial.total - 0) : TOTAL;
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
    hint: partial.hint || '顶部细条可拖动面板',
    status: status,
    statusBg: running ? '#3300C853' : paused ? '#33FFB300' : done ? '#334CAF50' : '#33FFFFFF',
    statusColor: running ? '#A5D6A7' : paused ? '#FFE082' : done ? '#C8E6C9' : '#EEEEEE'
  };
}

Page({
  data: panelState({
    count: 0,
    text: '任务面板',
    hint: '顶部细条可拖动面板',
    status: '待命'
  }),
  onLoad: function () {
    Storage.putBoolean('float_pause', false);
  },
  onShow: function () {},
  onHide: function () {},
  onClose: function () {
    Storage.putBoolean('float_pause', true);
  },
  onTapPause: function () {
    Storage.putBoolean('float_pause', true);
    var id = myId();
    var cur = FloatPage.getData(id) || {};
    this.setData(panelState({
      count: cur.count,
      total: cur.total,
      text: '已暂停',
      hint: '任务将在下一轮退出循环',
      status: '已暂停'
    }));
  },
  onTapClose: function () {
    Storage.putBoolean('float_pause', true);
    FloatPage.close(myId());
  }
});
