function contentOf(page) {
  return String((page.data && page.data.content) || '').trim();
}

Page({
  data: {
    content: 'https://doc.deeke.cn',
    qrImage: '',
    hasImage: false,
    result: '输入内容后点「toFile 生成」'
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
        hasImage: false,
        qrImage: '',
        result: '异常: ' + ((e && e.message) || e)
      });
      this.toast('生成失败');
      return;
    }
    this.hideLoading();
    if (!path) {
      this.setData({ hasImage: false, qrImage: '', result: 'toFile 返回 null' });
      this.toast('生成失败');
      return;
    }
    this.setData({
      hasImage: true,
      qrImage: String(path),
      result: 'toFile → ' + path
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
        hasImage: false,
        qrImage: '',
        result: '异常: ' + ((e && e.message) || e)
      });
      return;
    }
    this.hideLoading();
    if (!path) {
      this.setData({ hasImage: false, qrImage: '', result: 'toFile 返回 null' });
      this.toast('生成失败');
      return;
    }
    this.setData({
      hasImage: true,
      qrImage: String(path),
      result: '彩色 toFile → ' + path
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
      this.setData({ result: '异常: ' + ((e && e.message) || e) });
      return;
    }
    this.hideLoading();
    if (!dataUrl) {
      this.setData({ result: 'toDataUrl 返回 null' });
      this.toast('生成失败');
      return;
    }
    // dataUrl 可直接作 image src；同时打印长度便于对照
    this.setData({
      hasImage: true,
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
      this.setData({ result: '异常: ' + ((e && e.message) || e) });
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
        hasImage: false,
        qrImage: '',
        result: '空内容异常: ' + ((e && e.message) || e)
      });
      return;
    }
    this.setData({
      hasImage: false,
      qrImage: '',
      result: '空内容 toFile → ' + (path == null ? 'null（预期）' : path)
    });
    this.toast('空内容应失败');
  }
});
