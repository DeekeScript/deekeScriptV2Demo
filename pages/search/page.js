Page({
  data: { keyword: '', noIcon: '' },
  onKeyword(e) {
    this.setData({ keyword: e.value });
  }
});
