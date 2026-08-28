Page({
  data: {
    banners: [
      { src: 'img/banner.svg', title: '运营活动' },
      { src: 'img/dy.svg', title: '抖音' },
      { src: 'img/xhs.svg', title: '小红书' }
    ]
  },
  onBanner(e) {
    var item = (e && e.item) || {};
    var title = item.title || ('第 ' + ((e && e.index != null ? e.index : 0) + 1) + ' 张');
    this.toast(title);
  }
});
