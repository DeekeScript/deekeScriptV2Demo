Component({
  data: {
    keyword: ''
  },
  created(props) {
    if (props && props.keyword) {
      this.setData({ keyword: props.keyword });
    }
  },
  pickFood() {
    this.setData({ keyword: '美食' });
  },
  pickShop() {
    this.setData({ keyword: '探店' });
  },
  pickLive() {
    this.setData({ keyword: '直播' });
  },
  onOk() {
    this.triggerEvent('confirm', { keyword: this.data.keyword });
  }
});
