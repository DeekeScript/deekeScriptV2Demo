Page({
  data: {
    photos: ['img/avatar-1.svg', 'img/avatar-2.svg'],
    count: 2
  },
  onPhotos(e) {
    var list = (e && e.value) ? e.value : [];
    this.setData({ photos: list, count: list.length });
  }
});
