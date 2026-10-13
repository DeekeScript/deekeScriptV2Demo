function textOf(page) {
  return String((page.data && page.data.shareText) || '').trim();
}

Page({
  data: {
    shareText: 'https://doc.deeke.cn\nDeekeScript Share 示例',
    status: '点下方按钮弹出系统分享面板'
  },

  onShareText() {
    var text = textOf(this);
    if (!text) {
      this.toast('请先输入文本');
      return;
    }
    var r = null;
    try {
      r = Share.shareText(text, '分享文本');
    } catch (e) {
      this.setData({ status: '异常: ' + ((e && e.message) || e) });
      this.toast('分享失败');
      return;
    }
    if (r && r.ok) {
      this.setData({ status: 'Share.shareText → ok' });
      this.toast('请选择要分享到的应用');
      return;
    }
    this.setData({
      status: '当前环境不支持分享' + (r && r.message ? '：' + r.message : '')
    });
    this.toast((r && r.message) || '当前环境不支持分享');
  },

  onShareFile() {
    var dir = Files.getFilesPath() + '/share-demo';
    try {
      if (!Files.exists(dir)) {
        Files.mkdirs(dir);
      }
    } catch (e) {}
    var path = dir + '/hello.txt';
    var body = 'DeekeScript Share.shareFile demo\n' + System.time() + '\n';
    try {
      Files.write(path, body);
    } catch (e2) {
      this.setData({ status: '写示例文件失败: ' + e2 + '\n路径：' + path });
      this.toast('写文件失败');
      return;
    }
    var r = null;
    try {
      r = Share.shareFile(path, '分享示例文件', 'text/plain');
    } catch (e3) {
      this.setData({
        status: '当前环境不支持分享\n日志位置：' + path
      });
      this.toast('当前环境不支持分享');
      return;
    }
    if (r && r.ok) {
      this.setData({ status: 'Share.shareFile → ok · ' + path });
      this.toast('请选择要分享到的应用');
      return;
    }
    this.setData({
      status:
        '当前环境不支持分享' +
        (r && r.message ? '：' + r.message : '') +
        '\n文件位置：' +
        path
    });
    this.toast((r && r.message) || '当前环境不支持分享');
  },

  onShareOptions() {
    var text = textOf(this) || 'Share.share options 示例';
    var r = null;
    try {
      r = Share.share({ text: text, title: '综合分享' });
    } catch (e) {
      this.setData({ status: '异常: ' + ((e && e.message) || e) });
      this.toast('分享失败');
      return;
    }
    if (r && r.ok) {
      this.setData({ status: 'Share.share({ text }) → ok' });
      this.toast('请选择要分享到的应用');
      return;
    }
    this.setData({
      status: '当前环境不支持分享' + (r && r.message ? '：' + r.message : '')
    });
    this.toast((r && r.message) || '当前环境不支持分享');
  }
});
