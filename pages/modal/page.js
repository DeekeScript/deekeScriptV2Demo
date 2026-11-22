Page({
  data: { open: false, remark: '' },
  onOpen() { this.setData({ open: true }); },
  onClose() { this.setData({ open: false }); },
  onSave() { this.setData({ open: false }); this.toast('已保存'); }
});
