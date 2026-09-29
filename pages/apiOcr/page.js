var permission = require('../../common/permission.js');
var demo = require('../../common/imagesDemo.js');

Page({
  data: {
    perm: '-',
    keyword: 'OCR',
    result: '-',
    status: '文字识别 / 找字',
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
  _kw() {
    var k = this.data.keyword;
    if (k == null || String(k).trim() === '') {
      return 'OCR';
    }
    return String(k).trim();
  },
  _shot() {
    var path = demo.captureScreen();
    this.setData({ lastShot: path });
    return path;
  },
  onGetText() {
    try {
      var path = this._shot();
      var text = Images.getText(path) || '';
      var preview = text.replace(/\n/g, ' · ').slice(0, 120);
      this.setData({
        result: preview || '(空)',
        status: 'getText 长度 ' + text.length
      });
      this.toast('识别 ' + text.length + ' 字');
    } catch (e) {
      this.setData({ status: 'getText 失败: ' + e });
    }
  },
  onGetTextAndRegion() {
    try {
      var path = this._shot();
      var lines = Images.getTextAndRegion(path) || [];
      this.setData({
        result: demo.textPreview(lines, 4),
        status: 'getTextAndRegion 共 ' + lines.length + ' 行'
      });
      this.toast(lines.length + ' 行');
    } catch (e) {
      this.setData({ status: 'getTextAndRegion 失败: ' + e });
    }
  },
  onOcr() {
    try {
      if (!demo.ensureCaptureReady()) {
        this.setData({ status: '请先开启录屏权限' });
        return;
      }
      var lines = Images.ocr() || [];
      this.setData({
        result: demo.textPreview(lines, 4),
        status: 'ocr() 共 ' + lines.length + ' 行'
      });
      this.toast(lines.length + ' 行');
    } catch (e) {
      this.setData({ status: 'ocr 失败: ' + e });
    }
  },
  onOcrRegion() {
    try {
      if (!demo.ensureCaptureReady()) {
        this.setData({ status: '请先开启录屏权限' });
        return;
      }
      var w = Device.width();
      var h = Math.floor(Device.height() / 2);
      var lines = Images.ocr(0, 0, w, h) || [];
      this.setData({
        result: demo.textPreview(lines, 4),
        status: 'ocr 上半屏 ' + lines.length + ' 行'
      });
      this.toast(lines.length + ' 行');
    } catch (e) {
      this.setData({ status: 'ocr 区域失败: ' + e });
    }
  },
  onHasText() {
    try {
      var path = this._shot();
      var kw = this._kw();
      var ok = Images.hasText(path, kw);
      this.setData({
        result: ok ? '包含「' + kw + '」' : '未包含「' + kw + '」',
        status: 'hasText'
      });
      this.toast(ok ? '有' : '无');
    } catch (e) {
      this.setData({ status: 'hasText 失败: ' + e });
    }
  },
  onFindText() {
    try {
      var path = this._shot();
      var kw = this._kw();
      var hits = Images.findText(path, kw) || [];
      var first = Images.findTextFirst(path, kw);
      var msg = '命中 ' + hits.length;
      if (first && first.rect) {
        msg += ' · 首区 ' + demo.fmtRect(first.rect);
      }
      this.setData({ result: msg, status: 'findText / findTextFirst' });
      this.toast('命中 ' + hits.length);
    } catch (e) {
      this.setData({ status: 'findText 失败: ' + e });
    }
  },
  onFindTextCenter() {
    try {
      var path = this._shot();
      var kw = this._kw();
      var p = Images.findTextCenter(path, kw);
      this.setData({
        result: p ? demo.fmtPoint(p) : 'null',
        status: p ? 'findTextCenter 成功' : '未找到「' + kw + '」'
      });
      this.toast(p ? demo.fmtPoint(p) : '未找到');
    } catch (e) {
      this.setData({ status: 'findTextCenter 失败: ' + e });
    }
  },
  onFindTextPosition() {
    try {
      var path = this._shot();
      var kw = this._kw();
      var rects = Images.findTextPosition(path, kw) || [];
      var first = rects.length > 0 ? demo.fmtRect(rects[0]) : '-';
      this.setData({
        result: '区域数 ' + rects.length + ' · ' + first,
        status: 'findTextPosition'
      });
      this.toast(rects.length + ' 处');
    } catch (e) {
      this.setData({ status: 'findTextPosition 失败: ' + e });
    }
  },
  onFindRegex() {
    try {
      var path = this._shot();
      var hits = Images.findTextMatches(path, '\\d+') || [];
      this.setData({
        result: demo.textPreview(hits, 4),
        status: 'findTextMatches \\d+ 共 ' + hits.length
      });
      this.toast(hits.length + ' 处');
    } catch (e) {
      this.setData({ status: '正则找字失败: ' + e });
    }
  },
  onFindInRegion() {
    try {
      var path = this._shot();
      var kw = this._kw();
      var w = Device.width();
      var h = Math.floor(Device.height() / 2);
      var hits = Images.findTextInRegion(path, kw, 0, 0, w, h) || [];
      var n = hits.length;
      var preview;
      if (n > 0 && typeof hits[0] === 'string') {
        preview = hits.slice(0, 3).join(' / ');
      } else {
        preview = demo.textPreview(hits, 3);
      }
      this.setData({
        result: preview || '(0)',
        status: 'findTextInRegion 上半屏 ' + n
      });
      this.toast(n + ' 处');
    } catch (e) {
      this.setData({ status: 'findTextInRegion 失败: ' + e });
    }
  },
  onWaitText() {
    try {
      if (!demo.ensureCaptureReady()) {
        this.setData({ status: '请先开启录屏权限' });
        return;
      }
      var kw = this._kw();
      this.setData({ status: 'waitText「' + kw + '」最多 3s…' });
      this.toast('等待中');
      var hit = Images.waitText(kw, 3000, 400, 'contains');
      this.setData({
        result: hit ? (hit.text || '命中') + ' · ' + demo.fmtRect(hit.rect) : '超时未出现',
        status: hit ? 'waitText 成功' : 'waitText 超时'
      });
      this.toast(hit ? '出现' : '超时');
    } catch (e) {
      this.setData({ status: 'waitText 失败: ' + e });
    }
  }
});
