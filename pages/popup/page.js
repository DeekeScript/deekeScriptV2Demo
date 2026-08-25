Page({
  data: {
    formOpen: false,
    topOpen: false,
    confirmOpen: false,
    leftOpen: false,
    remark: '',
    platform: 'dy',
    chooseOpen: false,
    picked: '未选'
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
  },
  onOpenChoose() {
    this.setData({ chooseOpen: true });
  },
  onPicked(e) {
    var keyword = e && e.detail ? e.detail.keyword : '';
    this.setData({ chooseOpen: false, picked: keyword || '未选' });
  }
});
