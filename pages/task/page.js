let catalog = require('common/data.js');
let permission = require('common/permission.js');

Page({
  data: {
    item: {},
    task_name: '',
    keyword: '',
    watch_min: '8',
    watch_max: '18',
    count_min: '20',
    count_max: '80',
    like_rate: 20,
    auto_comment: true,
    notify: true
  },
  onLoad(params) {
    var item = catalog.find(params && params.id) || catalog.apps[0] || {};
    var name = item.name || item.title || '任务';
    this.setData({
      item: {
        id: item.id,
        name: name,
        icon: item.icon || '',
        desc: item.desc || '配置后即可运行',
        tag: item.tag || '任务',
        jsFile: item.jsFile || 'tasks/sample.js'
      },
      task_name: stored('task_name', item.task_name || name),
      keyword: stored('keyword', item.keyword || ''),
      watch_min: stored('watch_min', item.watch_min || '8'),
      watch_max: stored('watch_max', item.watch_max || '18'),
      count_min: stored('count_min', item.count_min || '20'),
      count_max: stored('count_max', item.count_max || '80'),
      like_rate: storedNumber('like_rate', item.like_rate != null ? item.like_rate : 20),
      auto_comment: storedBool('auto_comment', item.auto_comment !== false),
      notify: storedBool('notify', item.notify !== false)
    });
  },
  onSave() {
    Storage.put('v2demo.task_name', this.data.task_name || '');
    Storage.put('v2demo.keyword', this.data.keyword || '');
    Storage.put('v2demo.watch_min', this.data.watch_min || '');
    Storage.put('v2demo.watch_max', this.data.watch_max || '');
    Storage.put('v2demo.count_min', this.data.count_min || '');
    Storage.put('v2demo.count_max', this.data.count_max || '');
    Storage.put('v2demo.like_rate', this.data.like_rate);
    Storage.put('v2demo.auto_comment', this.data.auto_comment);
    Storage.put('v2demo.notify', this.data.notify);
  },
  onRun() {
    permission.runScript(this.data.item.jsFile);
  }
});

function stored(name, fallback) {
  if (!Storage.exist('v2demo.' + name)) {
    return fallback;
  }
  return Storage.get('v2demo.' + name) || '';
}

function storedBool(name, fallback) {
  if (!Storage.exist('v2demo.' + name)) {
    return fallback;
  }
  var v = Storage.get('v2demo.' + name);
  return v === 'true' || v === '1';
}

function storedNumber(name, fallback) {
  if (!Storage.exist('v2demo.' + name)) {
    return fallback;
  }
  var n = parseFloat(Storage.get('v2demo.' + name));
  return isNaN(n) ? fallback : n;
}
