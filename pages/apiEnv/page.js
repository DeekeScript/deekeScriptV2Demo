function short(p) {
  if (p == null) return '(空)';
  var s = String(p);
  if (s.length <= 56) return s;
  return '…' + s.slice(-54);
}

function pathOf(v) {
  if (v == null) return null;
  if (typeof v === 'string') return v;
  try {
    if (v.getAbsolutePath) return v.getAbsolutePath();
  } catch (e) {}
  return '' + v;
}

Page({
  data: {
    root: '-',
    dirs: '-',
    preview: '-',
    status: 'Env + DeekeScript'
  },
  onShow() { this.onRefresh(); },
  onRefresh() {
    var root = '-';
    var cache = '-';
    var files = '-';
    try { root = short(DeekeScript.getProjectRoot()); } catch (e) { root = '失败'; }
    try { cache = short(pathOf(Env.getCacheDir())); } catch (e2) {}
    try { files = short(pathOf(Env.getFilesDir())); } catch (e3) {}
    this.setData({
      root: root,
      dirs: 'cache: ' + cache + '\nfiles: ' + files,
      status: '已刷新 · ' + System.time()
    });
  },
  onReadJson() {
    try {
      var text = DeekeScript.readFile('deekeScript.json') || '';
      var preview = text.replace(/\s+/g, ' ').slice(0, 120);
      this.setData({
        preview: preview || '(空)',
        status: 'readFile 长度 ' + text.length
      });
      this.toast(text.length + ' 字');
    } catch (e) {
      this.setData({ preview: '(失败)', status: 'readFile: ' + e });
    }
  },
  onDeekeJson() {
    try {
      var obj = DeekeScriptJson.toJson();
      var name = (obj && obj.name) || '-';
      var pages = (obj && obj.pages && obj.pages.length) || 0;
      var home = (obj && obj.home) || '-';
      this.setData({
        preview: 'name=' + name + ' · home=' + home + ' · pages=' + pages,
        status: 'DeekeScriptJson.toJson() · ' + System.time()
      });
      this.toast('pages=' + pages);
    } catch (e) {
      this.setData({ preview: '(失败)', status: 'DeekeScriptJson: ' + e });
    }
  },
  onDownload() {
    try {
      var p = pathOf(Env.getDownloadDir());
      this.setData({ status: 'Download: ' + short(p) });
      this.toast('已取 Download');
    } catch (e) {
      this.setData({ status: 'getDownloadDir: ' + e });
    }
  },
  onDcim() {
    try {
      var p = pathOf(Env.getDcimDir());
      this.setData({ status: 'DCIM: ' + short(p) });
      this.toast('已取 DCIM');
    } catch (e) {
      this.setData({ status: 'getDcimDir: ' + e });
    }
  }
});
