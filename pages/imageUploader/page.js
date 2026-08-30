Page({
  data: {
    photos: ['img/avatar-1.jpg', 'img/avatar-2.jpg'],
    count: 2,
    blue_photos: []
  },
  onPhotos(e) {
    var list = (e && e.value) ? e.value : [];
    this.setData({ photos: list, count: list.length });
  }
});
