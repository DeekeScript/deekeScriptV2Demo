Page({
  data: {
    auto_start: false,
    notify: true,
    night: false,
    blue: true,
    orange: true,
    comments: [
      { id: 'c_1', content: '写得真好，学到了', enabled: true },
      { id: 'c_2', content: '太有共鸣了', enabled: false },
      { id: 'c_3', content: '支持一下，继续加油', enabled: true }
    ]
  },
  onToggle(e) {
    var list = this.data.comments || [];
    var i = e && e.index != null ? Number(e.index) : -1;
    if (i < 0 || i >= list.length) {
      return;
    }
    list[i].enabled = e.value === true;
    this.setData({ comments: list });
    this.toast(list[i].enabled ? '已启用' : '已停用');
  }
});
