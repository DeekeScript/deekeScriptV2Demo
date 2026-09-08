/**
 * 悬浮窗 hint（多开示例）。
 */
var FLOAT_ID = 'hint';
var TOTAL = 30;

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
    text: '面板 hint',
    hint: '多开示例',
    status: '待命'
  }),
  onLoad: function () {},
  onTapPause: function () {
    var cur = FloatPage.getData(FLOAT_ID) || {};
    this.setData(panelState({
      count: cur.count,
      total: cur.total,
      text: '已暂停',
      hint: '多开面板',
      status: '已暂停'
    }));
  },
  onTapClose: function () {
    FloatPage.close(FLOAT_ID);
  }
});
