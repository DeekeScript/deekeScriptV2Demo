Page({
  data: {
    tab: 'follow'
  },
  onTab(e) {
    this.setData({ tab: e.value });
  }
});
