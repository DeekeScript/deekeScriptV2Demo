let line = require('common/line.js');
let catalog = require('common/data.js');
let permission = require('common/permission.js');

Page({
  data: {
    keyword: '',
    all: [],
    tasks: catalog.stats,
    loading: false,
    noMore: false,
    empty: false,
    footer: ''
  },
  onLoad() {
    this.setData({ all: this.data.tasks });
  },
  onSearch(e) {
    var q = String(e.value || '').trim().toLowerCase();
    var src = this.data.all;
    var next = [];
    for (var i = 0; i < src.length; i++) {
      var t = src[i];
      var blob = (t.title + ' ' + t.status + ' ' + t.time).toLowerCase();
      if (!q || blob.indexOf(q) >= 0) {
        next.push(t);
      }
    }
    this.setData({ keyword: e.value, tasks: next, empty: next.length === 0 });
  },
  onRun(e) {
    permission.runScript(e.item.jsFile);
  },
  onReachBottom() {
    if (this.data.loading || this.data.noMore) {
      return;
    }
    this.setData({ loading: true });
    System.sleep(2000);
    this.setData({ loading: false, noMore: true, footer: line.end() });
  }
});
