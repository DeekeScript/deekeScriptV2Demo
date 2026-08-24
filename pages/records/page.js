let data = require('common/data.js');
let line = require('common/line.js');

Page({
  data: {
    keyword: '',
    tasks: data.tasks,
    loading: false,
    noMore: false,
    footer: ''
  },
  all: data.tasks,
  onLoad() {
    // let data = JSON.parse(Http.get('https://example.com/dke/tasks'));
    // this.all = data.items;
    // this.setData({ tasks: this.all });
  },
  onSearch() {
    let q = this.data.keyword || '';
    this.setData({
      tasks: this.all.filter(function (item) {
        return (item.title + item.status + item.user).indexOf(q) >= 0;
      })
    });
  },
  onRun(e) {
    Engines.executeScript(e.item.jsFile);
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
