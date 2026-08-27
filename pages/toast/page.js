Page({
  data: { show: false },
  onApi() { this.toast('保存成功'); },
  onNode() { this.setData({ show: true }); }
});
