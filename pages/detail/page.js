let catalog = require('common/data.js');

Page({
  data: {
    item: {}
  },
  onLoad(params) {
    var item = catalog.find(params && params.id) || {};
    this.setData({ item: item });
    // let data = JSON.parse(Http.get('https://example.com/dke/task?id=' + params.id));
    // this.setData({ item: data.item });
  },
  onRun() {
    Engines.executeScript(this.data.item.jsFile);
  }
});
