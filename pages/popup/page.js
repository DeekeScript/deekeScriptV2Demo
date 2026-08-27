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
    this.showPopup('formOpen');
  },
  onSaveForm() {
    this.setData({ formOpen: false, remark: this.data.remark || '' });
  },
  onOpenTop() {
    this.showPopup('topOpen');
  },
  onCloseTop() {
    this.hidePopup('topOpen');
  },
  onOpenConfirm() {
    this.showPopup('confirmOpen');
  },
  onCloseConfirm() {
    this.hidePopup('confirmOpen');
  },
  onOpenLeft() {
    this.showPopup('leftOpen');
  },
  onCloseLeft() {
    this.setData({ leftOpen: false, platform: this.data.platform || 'dy' });
  },
  onOpenChoose() {
    this.showPopup('chooseOpen');
  },
  onPicked(e) {
    var keyword = e && e.detail ? e.detail.keyword : '';
    this.setData({ chooseOpen: false, picked: keyword || '未选' });
  }
});
