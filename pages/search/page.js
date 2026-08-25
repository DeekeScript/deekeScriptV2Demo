Page({
  data: { keyword: '' },
  onKeyword(e) {
    this.setData({ keyword: e.value });
  }
});
