/**
 * 图色展厅共用：带权限检查的截图（不触碰运行时间窗口）。
 * 截图前隐藏时间窗见「系统函数 System」示例。
 */
var permission = require('./permission.js');

function ensureCaptureReady() {
  return permission.ensureScreenCapture();
}

function captureScreen() {
  if (!ensureCaptureReady()) {
    throw new Error('无录屏权限');
  }
  return Images.capture();
}

function shortPath(path) {
  if (!path) {
    return '(空)';
  }
  var s = String(path);
  if (s.length <= 48) {
    return s;
  }
  return '…' + s.slice(-46);
}

function fmtPoint(p) {
  if (!p) {
    return 'null';
  }
  return Math.round(p.x) + ',' + Math.round(p.y);
}

function fmtMatch(m) {
  if (!m) {
    return 'null';
  }
  return 'c=' + Math.round(m.centerX) + ',' + Math.round(m.centerY)
    + ' score=' + (Math.round(m.score * 1000) / 1000);
}

function fmtRect(r) {
  if (!r) {
    return '-';
  }
  var left = typeof r.left === 'number' ? r.left : r.getLeft ? r.getLeft() : 0;
  var top = typeof r.top === 'number' ? r.top : r.getTop ? r.getTop() : 0;
  var w = r.width ? (typeof r.width === 'function' ? r.width() : r.width) : 0;
  var h = r.height ? (typeof r.height === 'function' ? r.height() : r.height) : 0;
  return left + ',' + top + ' ' + w + 'x' + h;
}

function textPreview(list, max) {
  max = max || 3;
  if (!list || !list.length) {
    return '(0)';
  }
  var n = Math.min(list.length, max);
  var parts = [];
  for (var i = 0; i < n; i++) {
    var item = list[i];
    var t = item && item.text != null ? item.text : item;
    parts.push(String(t).slice(0, 16));
  }
  var more = list.length > n ? '…共' + list.length : '';
  return parts.join(' / ') + more;
}

module.exports = {
  ensureCaptureReady: ensureCaptureReady,
  captureScreen: captureScreen,
  shortPath: shortPath,
  fmtPoint: fmtPoint,
  fmtMatch: fmtMatch,
  fmtRect: fmtRect,
  textPreview: textPreview
};
