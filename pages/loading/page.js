Page({
  onMask() {
    this.showLoading('加载中');
    System.sleep(1600);
    this.hideLoading();
  }
});
