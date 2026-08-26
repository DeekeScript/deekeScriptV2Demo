Component({
  data: {
    keyword: '',
    foodBg: '#EEF2F1',
    foodColor: '#006A65',
    shopBg: '#EEF2F1',
    shopColor: '#006A65',
    liveBg: '#EEF2F1',
    liveColor: '#006A65'
  },
  paint(keyword) {
    var onBg = '#006A65';
    var onFg = '#FFFFFF';
    var offBg = '#EEF2F1';
    var offFg = '#006A65';
    this.setData({
      keyword: keyword || '',
      foodBg: keyword === '美食' ? onBg : offBg,
      foodColor: keyword === '美食' ? onFg : offFg,
      shopBg: keyword === '探店' ? onBg : offBg,
      shopColor: keyword === '探店' ? onFg : offFg,
      liveBg: keyword === '直播' ? onBg : offBg,
      liveColor: keyword === '直播' ? onFg : offFg
    });
  },
  created(props) {
    if (props && props.keyword) {
      this.paint(props.keyword);
    }
  },
  pickFood() {
    this.paint('美食');
  },
  pickShop() {
    this.paint('探店');
  },
  pickLive() {
    this.paint('直播');
  },
  onOk() {
    this.triggerEvent('confirm', { keyword: this.data.keyword });
  }
});
