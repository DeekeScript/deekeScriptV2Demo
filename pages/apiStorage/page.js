var NOTE_KEY = 'v2demo.api_note';
var FILE_NAME = 'api_demo_note.txt';
var ZIP_NAME = 'api_demo_note.zip';

function notePath() {
  return Files.getFilesPath() + '/' + FILE_NAME;
}

function zipPath() {
  return Files.getCachePath() + '/' + ZIP_NAME;
}

function short(p) {
  if (!p) return '(空)';
  var s = String(p);
  return s.length <= 52 ? s : ('…' + s.slice(-50));
}

Page({
  data: {
    note: '你好，DeekeScript',
    storageValue: '-',
    fileValue: '-',
    filePath: '-',
    meta: '-',
    status: 'Storage + Files（读写 / 列表 / 大小 / zip）'
  },
  onLoad() { this.reload(); },
  reload() {
    var fromStorage = Storage.get(NOTE_KEY);
    var path = notePath();
    var fromFile = Files.exists(path) ? Files.read(path) : null;
    var meta = '-';
    try {
      if (Files.exists(path)) {
        meta = 'size=' + Files.size(path) + ' · isFile=' + Files.isFile(path);
      } else {
        meta = '文件不存在';
      }
    } catch (e) {
      meta = 'meta 失败';
    }
    this.setData({
      note: fromStorage != null ? fromStorage : (this.data.note || ''),
      storageValue: fromStorage != null ? fromStorage : '(空)',
      fileValue: fromFile != null ? String(fromFile).slice(0, 80) : '(文件不存在)',
      filePath: short(path),
      meta: meta
    });
  },
  onSave() {
    var text = this.data.note || '';
    Storage.put(NOTE_KEY, text);
    var path = notePath();
    var ok = Files.write(path, text + '\n# ' + System.time());
    this.setData({
      status: ok ? 'put + write 成功' : 'write 失败',
      storageValue: text,
      fileValue: (Files.read(path) || '').slice(0, 80),
      filePath: short(path)
    });
    this.reload();
    this.toast(ok ? '已保存' : '写文件失败');
  },
  onAppend() {
    var path = notePath();
    var ok = Files.append(path, '\n+ append @ ' + System.time());
    this.setData({ status: ok ? 'append 成功' : 'append 失败' });
    this.reload();
    this.toast(ok ? '已追加' : '追加失败');
  },
  onList() {
    try {
      var dir = Files.getFilesPath();
      var list = Files.list(dir) || [];
      var n = list.length;
      var head = [];
      for (var i = 0; i < Math.min(n, 5); i++) head.push(list[i]);
      this.setData({
        status: 'list 共 ' + n + ' · ' + head.join(', '),
        meta: 'dir=' + short(dir)
      });
      this.toast(n + ' 项');
    } catch (e) {
      this.setData({ status: 'list 失败: ' + e });
    }
  },
  onPaths() {
    try {
      var msg = [
        'files=' + short(Files.getFilesPath()),
        'cache=' + short(Files.getCachePath()),
        'download=' + short(Files.getDownloadPath())
      ].join('\n');
      this.setData({ status: msg, meta: '路径摘要' });
    } catch (e) {
      this.setData({ status: 'paths: ' + e });
    }
  },
  onZip() {
    try {
      var src = notePath();
      if (!Files.exists(src)) {
        this.setData({ status: '请先保存文件再 zip' });
        return;
      }
      var dest = zipPath();
      var ok = Files.zip(src, dest);
      this.setData({
        status: ok ? 'zip → ' + short(dest) + ' size=' + Files.size(dest) : 'zip 失败',
        meta: ok ? 'zip size=' + Files.size(dest) : this.data.meta
      });
      this.toast(ok ? '已压缩' : '失败');
    } catch (e) {
      this.setData({ status: 'zip 异常: ' + e });
    }
  },
  onClear() {
    Storage.remove(NOTE_KEY);
    var path = notePath();
    if (Files.exists(path)) Files.delete(path);
    var z = zipPath();
    if (Files.exists(z)) Files.delete(z);
    this.setData({
      note: '',
      storageValue: '(空)',
      fileValue: '(文件不存在)',
      status: '已清空 Storage / 文件 / zip'
    });
    this.reload();
    this.toast('已清空');
  }
});
