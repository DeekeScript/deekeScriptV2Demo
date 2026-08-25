let catalog = require('common/data.js');
let permission = require('common/permission.js');

Page({
  data: {
    item: {}
  },
  onLoad(params) {
    var item = catalog.find(params && params.id) || {};
    if (!item.title && item.name) {
      item = Object.assign({}, item, { title: item.name });
    }
    var sub = [];
    if (item.user) sub.push(item.user);
    if (item.time) sub.push(item.time);
    this.setData({ item: Object.assign({}, item, { sub: sub.join(' · ') }) });
    // let data = JSON.parse(Http.get('https://example.com/dke/task?id=' + params.id));
    // this.setData({ item: data.item });
  },
  onRun() {
    permission.runScript(this.data.item.jsFile);
  }
});
