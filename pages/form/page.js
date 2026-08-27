Page({
  data: {
    task_name: '每日关注',
    nickname: '',
    count: '20',
    remark: '',
    extras: [
      { key: 'kw_1', label: '关键词 1' }
    ]
  },
  onLoad() {
    var patch = {};
    readStored(patch, 'task_name');
    readStored(patch, 'nickname');
    readStored(patch, 'count');
    readStored(patch, 'remark');
    var extraRaw = Storage.get('v2demo.extras');
    if (extraRaw) {
      try {
        var parsed = JSON.parse(extraRaw);
        if (parsed && parsed.list) {
          patch.extras = parsed.list;
        }
        if (parsed && parsed.values) {
          for (var k in parsed.values) {
            patch[k] = parsed.values[k];
          }
        }
      } catch (e) {
      }
    }
    var has = false;
    for (var key in patch) {
      has = true;
      break;
    }
    if (has) {
      this.setData(patch);
    }
  },
  onSave() {
    Storage.put('v2demo.task_name', this.data.task_name || '');
    Storage.put('v2demo.nickname', this.data.nickname || '');
    Storage.put('v2demo.count', this.data.count || '');
    Storage.put('v2demo.remark', this.data.remark || '');
    var extras = this.data.extras || [];
    var values = {};
    for (var i = 0; i < extras.length; i++) {
      var key = extras[i].key;
      values[key] = this.data[key] || '';
    }
    Storage.put('v2demo.extras', JSON.stringify({ list: extras, values: values }));
  },
  onAddExtra() {
    var n = this.data.extras.length + 1;
    this.appendData('extras', [{ key: 'kw_' + n, label: '关键词 ' + n }]);
  },
  onRemoveExtra() {
    var list = this.data.extras;
    if (!list || list.length <= 1) {
      return;
    }
    var next = [];
    for (var i = 0; i < list.length - 1; i++) {
      next.push(list[i]);
    }
    this.setData({ extras: next });
  }
});

function readStored(patch, name) {
  if (!Storage.exist('v2demo.' + name)) {
    return;
  }
  patch[name] = Storage.get('v2demo.' + name) || '';
}
