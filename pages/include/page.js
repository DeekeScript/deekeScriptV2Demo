Page({
  data: {
    open: false,
    picked: '无'
  },
  onOpen() {
    this.setData({ open: true });
  },
  onPicked(e) {
    var keyword = e && e.detail ? e.detail.keyword : '';
    this.setData({ open: false, picked: keyword || '无' });
  }
});
