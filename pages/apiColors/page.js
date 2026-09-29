var permission = require('../../common/permission.js');
var demo = require('../../common/imagesDemo.js');

Page({
  data: {
    perm: '-',
    sample: '-',
    result: '-',
    status: '取色 / 找色',
    lastColor: '',
    lastHex: '',
    lastShot: ''
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
  _center() {
    return {
      x: Math.floor(Device.width() / 2),
      y: Math.floor(Device.height() / 2)
    };
  },
  _shot() {
    var path = demo.captureScreen();
    this.setData({ lastShot: path });
    return path;
  },
  _sampleCenter() {
    var path = this._shot();
    var c = this._center();
    var rgba = Images.getColor(path, c.x, c.y);
    var hex = Images.getColorHex(path, c.x, c.y);
    this.setData({
      lastColor: rgba,
      lastHex: hex,
      sample: hex + ' @' + c.x + ',' + c.y
    });
    return { path: path, rgba: rgba, hex: hex, x: c.x, y: c.y };
  },
  onGetColor() {
    try {
      var s = this._sampleCenter();
      this.setData({ result: s.rgba, status: 'getColor 成功' });
      this.toast(s.hex);
    } catch (e) {
      this.setData({ status: 'getColor 失败: ' + e });
    }
  },
  onGetColorHex() {
    try {
      var s = this._sampleCenter();
      this.setData({ result: s.hex, status: 'getColorHex 成功' });
      this.toast(s.hex);
    } catch (e) {
      this.setData({ status: 'getColorHex 失败: ' + e });
    }
  },
  onFindColor() {
    try {
      var s = this._sampleCenter();
      var points = Images.findColor(s.path, s.hex, 12);
      var n = points ? points.length : 0;
      var first = n > 0 ? demo.fmtPoint(points[0]) : '-';
      this.setData({
        result: '命中 ' + n + ' · 首点 ' + first,
        status: 'findColor 容差12'
      });
      this.toast('命中 ' + n);
    } catch (e) {
      this.setData({ status: 'findColor 失败: ' + e });
    }
  },
  onFindColorFirst() {
    try {
      var s = this._sampleCenter();
      var p = Images.findColorFirst(s.path, s.hex, 12);
      this.setData({
        result: p ? demo.fmtPoint(p) : 'null',
        status: p ? 'findColorFirst 成功' : '未找到'
      });
      this.toast(p ? demo.fmtPoint(p) : '未找到');
    } catch (e) {
      this.setData({ status: 'findColorFirst 失败: ' + e });
    }
  },
  onFindColorCenter() {
    try {
      var s = this._sampleCenter();
      var p = Images.findColorCenter(s.path, s.hex, 16);
      this.setData({
        result: p ? demo.fmtPoint(p) : 'null',
        status: p ? 'findColorCenter 成功' : '未找到'
      });
      this.toast(p ? demo.fmtPoint(p) : '未找到');
    } catch (e) {
      this.setData({ status: 'findColorCenter 失败: ' + e });
    }
  },
  onFindInRegion() {
    try {
      var s = this._sampleCenter();
      var w = Device.width();
      var h = Math.floor(Device.height() / 2);
      var points = Images.findColorInRegion(s.path, s.hex, 12, 0, 0, w, h);
      var n = points ? points.length : 0;
      this.setData({
        result: '上半屏命中 ' + n,
        status: 'findColorInRegion'
      });
      this.toast('命中 ' + n);
    } catch (e) {
      this.setData({ status: 'findColorInRegion 失败: ' + e });
    }
  },
  onFindRange() {
    try {
      var s = this._sampleCenter();
      // 用采样色 ±8 构造区间（避免机型色差）
      var hex = s.hex.replace('#', '');
      var r = parseInt(hex.slice(0, 2), 16);
      var g = parseInt(hex.slice(2, 4), 16);
      var b = parseInt(hex.slice(4, 6), 16);
      function clamp(v) { return Math.max(0, Math.min(255, v)); }
      var start = 'rgba(' + clamp(r - 8) + ',' + clamp(g - 8) + ',' + clamp(b - 8) + ',1.0)';
      var end = 'rgba(' + clamp(r + 8) + ',' + clamp(g + 8) + ',' + clamp(b + 8) + ',1.0)';
      var points = Images.findColor(s.path, start, end);
      var n = points ? points.length : 0;
      this.setData({
        sample: s.hex + ' → 区间±8',
        result: '区间命中 ' + n,
        status: 'findColor(start,end)'
      });
      this.toast('命中 ' + n);
    } catch (e) {
      this.setData({ status: '颜色区间失败: ' + e });
    }
  },
  onFindMulti() {
    try {
      var path = this._shot();
      var x = Math.floor(Device.width() / 2);
      var y = Math.floor(Device.height() / 2);
      var c0 = Images.getColorHex(path, x, y);
      var c1 = Images.getColorHex(path, x + 12, y);
      var c2 = Images.getColorHex(path, x, y + 12);
      this.setData({ sample: c0 + ' +邻点' });
      var p = Images.findMultiColors(path, c0, [[12, 0, c1], [0, 12, c2]], 10);
      this.setData({
        result: p ? demo.fmtPoint(p) : 'null',
        status: p ? 'findMultiColors 成功' : '未匹配特征'
      });
      this.toast(p ? demo.fmtPoint(p) : '未找到');
    } catch (e) {
      this.setData({ status: 'findMultiColors 失败: ' + e });
    }
  },
  onColorsFind() {
    try {
      var s = this._sampleCenter();
      var mat = Images.getMat(s.path);
      if (!mat) {
        this.setData({ status: 'Images.getMat 失败' });
        return;
      }
      var points = Colors.find(mat, s.hex, null, 12) || [];
      try { mat.release && mat.release(); } catch (e0) {}
      this.setData({
        result: 'Colors.find 命中 ' + points.length,
        status: 'OpenCV Colors.find（旧 API，日常优先 Images.findColor）'
      });
      this.toast('命中 ' + points.length);
    } catch (e) {
      this.setData({ status: 'Colors.find 失败: ' + e });
    }
  }
});
