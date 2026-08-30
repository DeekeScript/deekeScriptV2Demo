Page({
  data: { show: false, blue: false },
  onApi() { this.toast('保存成功'); },
  onNode() { this.setData({ show: true }); },
  onBlue() { this.setData({ blue: true }); }
});
