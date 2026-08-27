Page({
  data: { open: false, white: false, busy: false },
  onOpen() { this.setData({ open: true }); },
  onWhite() { this.setData({ white: true }); },
  onBusy() { this.setData({ busy: true }); },
  onDim() { this.toast('点了蒙层'); },
  onCloseBusy() { this.setData({ busy: false }); }
});
