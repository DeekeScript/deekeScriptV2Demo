Page({
  data: {
    tab: 'follow',
    tab_blue: 'a'
  },
  onTab(e) {
    this.setData({ tab: e.value });
  }
});
