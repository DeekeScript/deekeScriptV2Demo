var permission = require('../../common/permission.js');

Page({
  data: {
    perm: '-',
    listening: '未监听',
    latest: '(空)',
    code: '-',
    status: 'Sms 短信监听 / 提取验证码'
  },
  onUnload() { this.onStop(); },
  onHide() { this.onStop(); },
  onShow() { this.onCheck(); },
  onCheck() {
    var ok = false;
    try { ok = !!Access.hasSmsPermission(); } catch (e) {}
    this.setData({ perm: ok ? '已授权' : '未授权' });
  },
  onRequest() {
    permission.ensureSms();
    var that = this;
    setTimeout(function () { that.onCheck(); }, 600);
  },
  onExtract() {
    var sample = '【Deeke】您的验证码是 837291，5分钟内有效';
    var code4 = '';
    var code6 = '';
    try {
      code4 = Sms.extractCode(sample) || '';
      code6 = Sms.extractCode(sample, 6) || '';
    } catch (e) {
      this.setData({ status: 'extractCode 异常: ' + e });
      return;
    }
    this.setData({
      code: '默认: ' + code4 + ' · 指定6位: ' + code6,
      status: 'extractCode 离线样例 · ' + System.time()
    });
    this.toast(code6 || code4 || '未提取到');
  },
  onStart() {
    if (!permission.ensureSms()) {
      this.setData({ status: '请先授予短信权限' });
      return;
    }
    var that = this;
    try {
      Sms.startListening(function (address, body) {
        var c = '';
        try { c = Sms.extractCode(body || '') || ''; } catch (e) {}
        that.setData({
          latest: (address || '') + ' · ' + (body || ''),
          code: c || '(未匹配)',
          status: '收到短信 · ' + System.time()
        });
        console.log('sms', address, body, c);
      });
      this._listening = true;
      this.setData({ listening: '监听中', status: 'startListening 已启动' });
      this.toast('已监听');
    } catch (e) {
      this.setData({ status: '失败: ' + e });
    }
  },
  onStop() {
    if (!this._listening) return;
    try { Sms.stopListening(); } catch (e) {}
    this._listening = false;
    this.setData({ listening: '未监听', status: '已 stopListening' });
  }
});
