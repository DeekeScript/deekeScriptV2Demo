Page({
  onMask() {
    this.showLoading('加载中');
    var that = this;
    setTimeout(function () {
      that.hideLoading();
    }, 1600);
  }
});
