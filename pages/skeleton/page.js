Page({
  data: {
    loading: true,
    ready: false
  },
  onLoadMore() {
    this.setData({ loading: true, ready: false });
  },
  onDone() {
    this.setData({ loading: false, ready: true });
  }
});
