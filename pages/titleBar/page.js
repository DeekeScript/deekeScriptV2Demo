Page({
  data: {
    hint: '还没有点击右侧按钮'
  },
  onShare() {
    this.setData({ hint: '已点「分享」' });
    System.toast('分享');
  },
  onAdd() {
    this.setData({ hint: '已点「添加」' });
    System.toast('添加');
  }
});
