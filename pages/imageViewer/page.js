Page({
  data: { open: false, index: 0 },
  onOpen(e) {
    var i = (e && e.value != null && e.value !== '') ? Number(e.value) : 0;
    if (isNaN(i)) i = 0;
    this.setData({ open: true, index: i });
  }
});
