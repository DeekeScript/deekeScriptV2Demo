Page({
  data: {
    open: false,
    picked: '未选'
  },
  onOpen() {
    this.setData({ open: true });
  },
  onPick(e) {
    var v = e && e.value ? e.value : '';
    var map = { camera: '拍照', album: '相册', 'default': '默认图' };
    this.setData({ open: false, picked: map[v] || v || '未选' });
  }
});
