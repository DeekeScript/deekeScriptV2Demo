let helper = require('./helper.js');
let data = require('common/data.js');
let line = require('common/line.js');

Page({
  data: {
    hello: helper.greet('DeekeScript'),
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
    //   hello: '你好，' + data.nickname,
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
    System.sleep(2000);
    this.setData({ loading: false, noMore: true, footer: line.end() });
  }
});
