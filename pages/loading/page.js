Page({
  data: {
    loading: true,
    done: false,
    spinOnly: true
  },
  onStart() {
    this.setData({ loading: true, done: false, spinOnly: true });
  },
  onDone() {
    this.setData({ loading: false, done: true, spinOnly: false });
  },
  onMask() {
    this.showLoading('加载中');
    var that = this;
    setTimeout(function () {
      that.hideLoading();
    }, 1500);
  }
});
