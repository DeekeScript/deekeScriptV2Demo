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
    let task_name = Storage.get('v2demo.task_name');
    if (task_name) {
      this.setData({ task_name: task_name });
    }
    let nickname = Storage.get('v2demo.nickname');
    if (nickname) {
      this.setData({ nickname: nickname });
    }
    let remark = Storage.get('v2demo.remark');
    if (remark) {
      this.setData({ remark: remark });
    }
  },
  onSave() {
    Storage.put('v2demo.task_name', this.data.task_name);
    Storage.put('v2demo.nickname', this.data.nickname);
    Storage.put('v2demo.remark', this.data.remark);
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
