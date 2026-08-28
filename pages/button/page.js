Page({
  data: {
    saving: false
  },
  onSave() {
    this.setData({ saving: true });
    System.sleep(1500);
    this.setData({ saving: false });
    this.toast('已保存');
  }
});
