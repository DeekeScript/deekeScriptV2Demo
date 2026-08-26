let catalog = require('common/data.js');

function nowText() {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

function copyLogs(src) {
  var out = [];
  var i;
  var n = src && src.length ? src.length : 0;
  for (i = 0; i < n; i++) {
    out.push(src[i]);
  }
  return out;
}

function metricsOf(times, stamp) {
  return [
    { label: '刷新次数', value: String(times || 0) },
    { label: '最近时间', value: stamp || '--' }
  ];
}

Page({
  data: {
    logs: [],
    times: 0,
    updated: '尚未加载',
    metrics: metricsOf(0, '--')
  },
  onLoad() {
    this.loadLogs(false);
  },
  onPullDownRefresh() {
    this.loadLogs(true);
    this.stopPullDownRefresh();
  },
  loadLogs(fromPull) {
    System.sleep(600);
    var list = copyLogs(catalog.stats);
    var n = this.data.times || 0;
    var stamp = nowText();
    if (fromPull) {
      n = n + 1;
      list.unshift({
        title: '刚刚刷新',
        time: stamp,
        status: '完成'
      });
    }
    this.setData({
      logs: list,
      times: n,
      updated: stamp,
      metrics: metricsOf(n, stamp)
    });
    if (fromPull) {
      System.toast('已刷新');
    }
  }
});
