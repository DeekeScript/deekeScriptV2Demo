Page({
  data: { open: false, remark: '' },
  onOpen() { this.setData({ open: true }); },
  onSave() { this.setData({ open: false }); this.toast('已保存'); }
});
