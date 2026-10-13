function contentOf(page) {
  return String((page.data && page.data.content) || '').trim();
}

function failResult(e) {
  return '异常: ' + ((e && e.message) || e);
}

Page({
  data: {
    content: 'https://doc.deeke.cn',
    qrImage: '',
    hasSingle: false,
    hasCompare: false,
    needCompareHint: true,
    qr128: '',
    qr256: '',
    qr400: '',
    qrDefault: '',
    qrBrand: '',
    qrBlue: '',
    qrOrange: '',
    result: '输入内容后点「对比示例」看尺寸 / 颜色差异'
  },

  onCompare() {
    var text = contentOf(this);
    if (!text) {
      this.toast('请先输入内容');
      return;
    }
    this.showLoading('生成对比…');
    var qr128 = null;
    var qr256 = null;
    var qr400 = null;
    var qrDefault = null;
    var qrBrand = null;
    var qrBlue = null;
    var qrOrange = null;
    try {
      qr128 = QrCode.toFile(text, { size: 128, margin: 1, level: 'M' });
      qr256 = QrCode.toFile(text, { size: 256, margin: 1, level: 'M' });
      qr400 = QrCode.toFile(text, { size: 400, margin: 1, level: 'M' });
      qrDefault = QrCode.toFile(text, {
        size: 280,
        margin: 1,
        foreground: '#000000',
        background: '#FFFFFF'
      });
      qrBrand = QrCode.toFile(text, {
        size: 280,
        margin: 2,
        level: 'Q',
        foreground: '#006A65',
        background: '#F0F7F6'
      });
      qrBlue = QrCode.toFile(text, {
        size: 280,
        margin: 1,
        foreground: '#1A56DB',
        background: '#EFF6FF'
      });
      qrOrange = QrCode.toFile(text, {
        size: 280,
        margin: 1,
        foreground: '#C2410C',
        background: '#FFF7ED'
      });
    } catch (e) {
      this.hideLoading();
      this.setData({ result: failResult(e) });
      this.toast('生成失败');
      return;
    }
    this.hideLoading();
    if (!qr128 || !qr400 || !qrBrand) {
      this.setData({ result: '对比生成不完整（有 null）' });
      this.toast('生成失败');
      return;
    }
    this.setData({
      hasCompare: true,
      needCompareHint: false,
      qr128: String(qr128),
      qr256: String(qr256),
      qr400: String(qr400),
      qrDefault: String(qrDefault),
      qrBrand: String(qrBrand),
      qrBlue: String(qrBlue),
      qrOrange: String(qrOrange),
      result: '已生成：128 / 256 / 400 与 4 种配色（同内容）'
    });
    this.toast('对比已生成');
  },

  onToFile() {
    var text = contentOf(this);
    if (!text) {
      this.toast('请先输入内容');
      return;
    }
    this.showLoading('生成中…');
    var path = null;
    try {
      path = QrCode.toFile(text, {
        size: 400,
        margin: 1,
        level: 'M',
        format: 'png'
      });
    } catch (e) {
      this.hideLoading();
      this.setData({
        hasSingle: false,
        qrImage: '',
        result: failResult(e)
      });
      this.toast('生成失败');
      return;
    }
    this.hideLoading();
    if (!path) {
      this.setData({ hasSingle: false, qrImage: '', result: 'toFile 返回 null' });
      this.toast('生成失败');
      return;
    }
    this.setData({
      hasSingle: true,
      qrImage: String(path),
      result: 'toFile 默认 → ' + path
    });
    this.toast('已生成');
  },

  onToFileStyled() {
    var text = contentOf(this);
    if (!text) {
      this.toast('请先输入内容');
      return;
    }
    this.showLoading('生成中…');
    var path = null;
    try {
      path = QrCode.toFile(text, {
        size: 480,
        margin: 2,
        level: 'Q',
        foreground: '#006A65',
        background: '#F0F7F6',
        format: 'png'
      });
    } catch (e) {
      this.hideLoading();
      this.setData({
        hasSingle: false,
        qrImage: '',
        result: failResult(e)
      });
      return;
    }
    this.hideLoading();
    if (!path) {
      this.setData({ hasSingle: false, qrImage: '', result: 'toFile 返回 null' });
      this.toast('生成失败');
      return;
    }
    this.setData({
      hasSingle: true,
      qrImage: String(path),
      result: '彩色大图 toFile → ' + path
    });
    this.toast('已生成');
  },

  onToDataUrl() {
    var text = contentOf(this);
    if (!text) {
      this.toast('请先输入内容');
      return;
    }
    this.showLoading('生成中…');
    var dataUrl = null;
    try {
      dataUrl = QrCode.toDataUrl(text, 240);
    } catch (e) {
      this.hideLoading();
      this.setData({ result: failResult(e) });
      return;
    }
    this.hideLoading();
    if (!dataUrl) {
      this.setData({ result: 'toDataUrl 返回 null' });
      this.toast('生成失败');
      return;
    }
    this.setData({
      hasSingle: true,
      qrImage: String(dataUrl),
      result: 'toDataUrl 长度 ' + String(dataUrl).length
    });
    this.toast('已生成');
  },

  onToBase64() {
    var text = contentOf(this);
    if (!text) {
      this.toast('请先输入内容');
      return;
    }
    var b64 = null;
    try {
      b64 = QrCode.toBase64(text, 200);
    } catch (e) {
      this.setData({ result: failResult(e) });
      return;
    }
    if (!b64) {
      this.setData({ result: 'toBase64 返回 null' });
      this.toast('生成失败');
      return;
    }
    this.setData({
      result: 'toBase64 长度 ' + String(b64).length + '（无 data: 前缀，适合上传）'
    });
    this.toast('已生成 Base64');
  },

  onEmpty() {
    var path = null;
    try {
      path = QrCode.toFile('');
    } catch (e) {
      this.setData({
        hasSingle: false,
        qrImage: '',
        result: '空内容异常: ' + ((e && e.message) || e)
      });
      return;
    }
    this.setData({
      hasSingle: false,
      qrImage: '',
      result: '空内容 toFile → ' + (path == null ? 'null（预期）' : path)
    });
    this.toast('空内容应失败');
  }
});
