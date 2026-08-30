Page({
  data: { keyword: '', noIcon: '', squareQ: '', cancelQ: '', blueQ: '' },
  onKeyword(e) {
    this.setData({ keyword: e.value });
  },
  onSearch(e) {
    this.toast('搜索：' + (e && e.value ? e.value : ''));
  },
  onCancelSearch() {
    this.setData({ cancelQ: '' });
    this.toast('已取消');
  },
  onCancelBlue() {
    this.setData({ blueQ: '' });
    this.toast('已取消');
  }
});
