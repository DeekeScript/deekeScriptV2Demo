var permission = require('../../common/permission.js');

Page({
  data: {
    perm: '-',
    pkg: '-',
    count: '-',
    hit: '-',
    status: 'UiSelector + System.currentPackage'
  },
  onShow() { this.onCheck(); },
  onCheck() {
    var ok = false;
    try { ok = !!Access.isAccessibilityServiceEnabled(); } catch (e) {}
    this.setData({ perm: ok ? '已开启' : '未开启' });
  },
  onRequest() {
    permission.ensureAccessibility();
    this.onCheck();
  },
  onProbe() {
    if (!permission.ensureAccessibility()) {
      this.setData({ status: '请先开启无障碍' });
      return;
    }
    try {
      var pkg = System.currentPackage();
      var act = '-';
      try { act = System.currentActivity() || '-'; } catch (e0) {}
      var list = UiSelector().clickable(true).isVisibleToUser(true).find();
      var n = 0;
      if (list) {
        if (typeof list.length === 'number') n = list.length;
        else if (list.size) n = list.size();
      }
      this.setData({
        pkg: (pkg || '-') + (act !== '-' ? '\n' + act : ''),
        count: '' + n,
        status: '探测完成'
      });
      this.toast('可点击可见 ' + n);
    } catch (e) {
      this.setData({ status: '失败: ' + e });
    }
  },
  onFindText() {
    if (!permission.ensureAccessibility()) {
      this.setData({ status: '请先开启无障碍' });
      return;
    }
    try {
      var node = UiSelector().textContains('接口').isVisibleToUser(true).findOne(800);
      if (!node) {
        node = UiSelector().textContains('权限').isVisibleToUser(true).findOne(800);
      }
      var hit = '(未找到)';
      if (node) {
        var t = '';
        try { t = node.text ? (typeof node.text === 'function' ? node.text() : node.text) : ''; } catch (e1) {}
        hit = t ? String(t).slice(0, 40) : '命中节点';
      }
      this.setData({ hit: hit, status: 'textContains findOne' });
      this.toast(node ? '找到' : '未找到');
    } catch (e) {
      this.setData({ status: 'findOne 失败: ' + e });
    }
  },
  onExists() {
    if (!permission.ensureAccessibility()) {
      this.setData({ status: '请先开启无障碍' });
      return;
    }
    try {
      var ok = UiSelector().clickable(true).exists();
      this.setData({
        hit: ok ? '存在可点击节点' : '不存在',
        status: 'exists()'
      });
      this.toast(ok ? 'exists=true' : 'false');
    } catch (e) {
      this.setData({ status: 'exists 失败: ' + e });
    }
  }
});
