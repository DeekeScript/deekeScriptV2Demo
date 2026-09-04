Page({
  data: {
    saving: false
  },
  onSave() {
    this.setData({ saving: true });
    var that = this;
    setTimeout(function () {
      that.setData({ saving: false });
      that.toast('已保存');
    }, 1500);
  }
});
