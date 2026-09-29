var permission = require('../../common/permission.js');

Page({
  data: {
    perm: '-',
    images: '-',
    videos: '-',
    audios: '-',
    status: 'MediaStore 只统计数量，不列出全部内容'
  },
  onShow() { this.onCheck(); },
  onCheck() {
    var ok = false;
    try { ok = !!Access.hasMediaReadPermission(); } catch (e) {}
    this.setData({ perm: ok ? '已开启' : '未开启' });
  },
  onRequest() {
    if (Access.hasMediaReadPermission()) {
      this.setData({ status: '媒体权限已开启' });
      this.toast('已开启');
      this.onCheck();
      return;
    }
    this.setData({ status: '正在申请媒体权限…' });
    permission.ensureMedia();
    var that = this;
    setTimeout(function () { that.onCheck(); }, 800);
  },
  _need() {
    if (!Access.hasMediaReadPermission()) {
      this.setData({ status: '请先开启媒体权限' });
      this.toast('无权限');
      return false;
    }
    return true;
  },
  onImages() {
    if (!this._need()) return;
    try {
      var list = MediaStore.getImages() || [];
      this.setData({ images: '' + list.length, status: 'getImages 数量' });
      this.toast(list.length + ' 张');
    } catch (e) {
      this.setData({ status: 'getImages: ' + e });
    }
  },
  onVideos() {
    if (!this._need()) return;
    try {
      var list = MediaStore.getVideos() || [];
      this.setData({ videos: '' + list.length, status: 'getVideos 数量' });
      this.toast(list.length + ' 个');
    } catch (e) {
      this.setData({ status: 'getVideos: ' + e });
    }
  },
  onAudios() {
    if (!this._need()) return;
    try {
      var list = MediaStore.getAudios() || [];
      this.setData({ audios: '' + list.length, status: 'getAudios 数量' });
      this.toast(list.length + ' 个');
    } catch (e) {
      this.setData({ status: 'getAudios: ' + e });
    }
  },
  onAll() {
    if (!this._need()) return;
    try {
      var i = (MediaStore.getImages() || []).length;
      var v = (MediaStore.getVideos() || []).length;
      var a = (MediaStore.getAudios() || []).length;
      this.setData({
        images: '' + i,
        videos: '' + v,
        audios: '' + a,
        status: '合计 ' + (i + v + a)
      });
      this.toast('已统计');
    } catch (e) {
      this.setData({ status: '统计失败: ' + e });
    }
  }
});
