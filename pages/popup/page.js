Page({
  data: {
    formOpen: false,
    topOpen: false,
    confirmOpen: false,
    leftOpen: false,
    remark: '',
    platform: 'dy'
  },
  onOpenForm() {
    this.setData({ formOpen: true });
  },
  onSaveForm() {
    this.setData({ formOpen: false });
  },
  onOpenTop() {
    this.setData({ topOpen: true });
  },
  onCloseTop() {
    this.setData({ topOpen: false });
  },
  onOpenConfirm() {
    this.setData({ confirmOpen: true });
  },
  onCloseConfirm() {
    this.setData({ confirmOpen: false });
  },
  onOpenLeft() {
    this.setData({ leftOpen: true });
  },
  onCloseLeft() {
    this.setData({ leftOpen: false });
  }
});
