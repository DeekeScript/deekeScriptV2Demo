var permission = require('../../common/permission.js');
var demo = require('../../common/imagesDemo.js');

Page({
  data: {
    perm: '-',
    shot: '-',
    result: '-',
    status: '截图 / 找图 / 裁剪缩放',
    lastShot: '',
    lastTpl: ''
  },
  onShow() { this.onCheck(); },
  onCheck() {
    var ok = false;
    try { ok = !!Access.isMediaProjectionEnable(); } catch (e) {}
    this.setData({ perm: ok ? '已开启' : '未开启' });
  },
  onRequest() {
    this.setData({ status: '正在申请录屏权限…' });
    permission.ensureScreenCapture();
    var that = this;
    setTimeout(function () { that.onCheck(); }, 800);
  },
  _shot() {
    var path = demo.captureScreen();
    this.setData({ lastShot: path, shot: demo.shortPath(path) });
    return path;
  },
  onCapture() {
    try {
      var path = this._shot();
      this.setData({ result: demo.shortPath(path), status: 'capture 成功' });
      this.toast('已截图');
    } catch (e) {
      this.setData({ status: 'capture 失败: ' + e });
    }
  },
  onCrop() {
    try {
      var path = this._shot();
      var out = Images.crop(path, 40, 120, 120, 120);
      this.setData({
        lastTpl: out,
        result: 'crop → ' + demo.shortPath(out),
        status: 'crop 成功'
      });
      this.toast('已裁剪');
    } catch (e) {
      this.setData({ status: 'crop 失败: ' + e });
    }
  },
  onScale() {
    try {
      var path = this._shot();
      var out = Images.scale(path, 0.5);
      this.setData({ result: 'scale → ' + demo.shortPath(out), status: 'scale 0.5 成功' });
      this.toast('已缩放');
    } catch (e) {
      this.setData({ status: 'scale 失败: ' + e });
    }
  },
  onFindSelf() {
    try {
      var screen = this._shot();
      var left = Math.floor(Device.width() * 0.35);
      var top = Math.floor(Device.height() * 0.35);
      var tpl = Images.crop(screen, left, top, 96, 96);
      this.setData({ lastTpl: tpl });
      var m = Images.findOneMatch(screen, tpl, 0.75);
      this.setData({
        result: m ? demo.fmtMatch(m) : '未匹配',
        status: m ? 'findOneMatch 成功' : 'findOneMatch 未找到'
      });
      this.toast(m ? '找到模板' : '未找到');
    } catch (e) {
      this.setData({ status: '找图失败: ' + e });
    }
  },
  onFindMatches() {
    try {
      var screen = this.data.lastShot || this._shot();
      var tpl = this.data.lastTpl;
      if (!tpl) {
        var left = Math.floor(Device.width() * 0.35);
        var top = Math.floor(Device.height() * 0.35);
        tpl = Images.crop(screen, left, top, 96, 96);
        this.setData({ lastTpl: tpl });
      }
      var list = Images.findMatches(screen, tpl, 0.75);
      var n = list ? list.length : 0;
      var first = n > 0 ? demo.fmtMatch(list[0]) : '-';
      this.setData({
        result: '命中 ' + n + ' · ' + first,
        status: 'findMatches 完成'
      });
      this.toast('命中 ' + n);
    } catch (e) {
      this.setData({ status: 'findMatches 失败: ' + e });
    }
  },
  onFindInRegion() {
    try {
      var screen = this._shot();
      var w = Device.width();
      var h = Device.height();
      var left = Math.floor(w * 0.2);
      var top = Math.floor(h * 0.2);
      var rw = Math.floor(w * 0.6);
      var rh = Math.floor(h * 0.4);
      var tpl = Images.crop(screen, left + 20, top + 20, 80, 80);
      var m = Images.findOneInRegion(screen, tpl, 0.75, left, top, rw, rh);
      this.setData({
        lastTpl: tpl,
        result: m ? demo.fmtMatch(m) : '区域内未匹配',
        status: m ? 'findOneInRegion 成功' : 'findOneInRegion 未找到'
      });
      this.toast(m ? '区域命中' : '未找到');
    } catch (e) {
      this.setData({ status: '区域找图失败: ' + e });
    }
  },
  onTakePhoto() {
    if (!permission.ensureCamera()) {
      this.setData({ status: '请先授予摄像头权限' });
      return;
    }
    try {
      var path = Images.takePhoto();
      this.setData({
        result: demo.shortPath(path),
        status: path ? 'takePhoto 成功' : 'takePhoto 返回空'
      });
      this.toast(path ? '已拍照' : '失败');
    } catch (e) {
      this.setData({ status: 'takePhoto 失败: ' + e });
    }
  }
});
