var permission = require('../../common/permission.js');

Page({
  data: {
    inputValue: '-',
    confirmResult: '-',
    status: 'Dialogs 前台弹窗；切后台请用 FloatDialogs（需悬浮窗权限）'
  },
  onShowDialog() {
    Dialogs.show('温馨提示', 'Dialogs.show · ' + System.time());
    this.setData({ status: '已 Dialogs.show' });
  },
  onConfirm() {
    var that = this;
    Dialogs.confirm('提示', '确定继续吗？', function (ok) {
      that.setData({
        confirmResult: ok ? '确定' : '取消',
        status: 'Dialogs.confirm → ' + (ok ? 'true' : 'false')
      });
      that.toast(ok ? '点了确定' : '点了取消');
    });
  },
  onInput() {
    var value = Dialogs.input('请输入备注', this.data.inputValue === '-' ? 'Deeke' : this.data.inputValue);
    this.setData({
      inputValue: value == null ? '(空)' : '' + value,
      status: 'Dialogs.input → ' + value
    });
  },
  onFloatDialog() {
    if (!permission.ensureFloat()) {
      this.setData({ status: '未开悬浮窗，已引导去设置' });
      return;
    }
    FloatDialogs.show('FloatDialogs', '后台/悬浮场景可用 · ' + System.time());
    this.setData({ status: '已 FloatDialogs.show' });
  }
});
