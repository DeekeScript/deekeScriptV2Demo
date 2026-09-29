var DB_NAME = 'v2demo_api';
var TABLE = 'notes';
var LOG_FILE = 'v2demo_api.log';

function db() {
  return Sqlite.create(DB_NAME);
}

Page({
  data: {
    title: '示例记录',
    count: '0',
    latest: '-',
    logHint: '-',
    status: 'Sqlite 写表 + Log 写文件'
  },
  onLoad() {
    Log.setFile(LOG_FILE);
    this.reload();
  },
  reload() {
    var store = db();
    var count = 0;
    var latest = '(无记录)';
    try {
      count = store.count(TABLE) || 0;
      var row = store.findOne(TABLE, {}, { orderBy: 'id DESC' });
      if (row) {
        latest = '#' + row.id + ' · ' + (row.title || '') + ' · ' + (row.createdAt || '');
      }
    } catch (e) {
      latest = '读取失败: ' + e;
    }
    this.setData({
      count: '' + count,
      latest: latest,
      logHint: 'Log.setFile(' + LOG_FILE + ')'
    });
  },
  onInsert() {
    var title = this.data.title || '未命名';
    var store = db();
    var id = store.insert(TABLE, {
      title: title,
      createdAt: System.time()
    });
    Log.log('insert', TABLE, id, title);
    this.setData({ status: 'insert id=' + id + '，已 Log.log' });
    this.reload();
    this.toast(id > 0 ? '已插入' : '插入失败');
  },
  onClear() {
    var store = db();
    store.clear(TABLE);
    Log.log('clear', TABLE);
    this.setData({ status: '已 clear 表，并写日志' });
    this.reload();
    this.toast('已清空表');
  }
});
