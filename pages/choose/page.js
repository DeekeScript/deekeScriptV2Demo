Page({
  data: {
    keyword: ''
  },
  onLoad(params) {
    if (params && params.keyword) {
      this.setData({ keyword: params.keyword });
    }
  },
  onOk() {
    this.triggerEvent('confirm', { keyword: this.data.keyword });
  }
});
