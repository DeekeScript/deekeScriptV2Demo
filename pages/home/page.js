let data = require('common/data.js');
let line = require('common/line.js');

Page({
  data: {
    hello: '你好，Pro',
    metrics: data.metrics,
    apps: data.apps,
    tags: data.tags,
    logs: data.tasks,
    loading: false,
    noMore: false,
    footer: ''
  },
  onLoad() {
    // let data = JSON.parse(Http.get('https://example.com/dke/home'));
    // this.setData({
    //   metrics: data.metrics,
    //   apps: data.apps,
    //   tags: data.tags,
    //   logs: data.logs
    // });
  },
  onReachBottom() {
    if (this.data.loading || this.data.noMore) {
      return;
    }
    this.setData({ loading: true });
    var that = this;
    setTimeout(function () {
      that.setData({ loading: false, noMore: true, footer: line.end() });
    }, 2000);
  }
});
