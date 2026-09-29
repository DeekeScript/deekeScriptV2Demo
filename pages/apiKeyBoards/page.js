Page({
  data: {
    canInput: '-',
    imeEnabled: '-',
    status: 'KeyBoards 走自研输入法，不依赖无障碍'
  },
  onShow() { this.onRefresh(); },
  onRefresh() {
    var can = false;
    var enabled = false;
    try { can = !!KeyBoards.canInput(); } catch (e) {}
    try { enabled = !!KeyBoards.isEnabled(); } catch (e2) {}
    this.setData({
      canInput: can ? 'true（当前默认输入法）' : 'false（请切换到本应用输入法）',
      imeEnabled: enabled ? '已启用' : '未启用',
      status: '已刷新 · ' + System.time()
    });
  },
  onPicker() {
    try {
      KeyBoards.showInputMethodPicker();
      this.setData({ status: '已弹出输入法选择（或跳转启用页）' });
    } catch (e) {
      this.setData({ status: '异常: ' + e });
    }
    var that = this;
    setTimeout(function () { that.onRefresh(); }, 800);
  },
  ensureIme() {
    try {
      if (KeyBoards.canInput()) {
        return true;
      }
    } catch (e) {}
    this.setData({ status: '请先启用并切换到本应用输入法' });
    try { KeyBoards.showInputMethodPicker(); } catch (e2) {}
    return false;
  },
  onInput() {
    if (!this.ensureIme()) {
      return;
    }
    try {
      var ok = KeyBoards.input('Deeke');
      this.setData({ status: ok ? 'input("Deeke") 成功' : 'input 失败（请先聚焦输入框）' });
      this.toast(ok ? '已输入' : '失败');
    } catch (e) {
      this.setData({ status: 'input 异常: ' + e });
    }
  },
  onDelete() {
    if (!this.ensureIme()) {
      return;
    }
    try {
      var ok = KeyBoards.delete();
      this.setData({ status: ok ? 'delete 成功' : 'delete 失败' });
    } catch (e) {
      this.setData({ status: 'delete 异常: ' + e });
    }
  },
  onEnter() {
    if (!this.ensureIme()) {
      return;
    }
    try {
      var ok = KeyBoards.pressEnter();
      this.setData({ status: ok ? 'pressEnter 成功' : 'pressEnter 失败' });
    } catch (e) {
      this.setData({ status: 'pressEnter 异常: ' + e });
    }
  },
  onTab() {
    if (!this.ensureIme()) {
      return;
    }
    try {
      var ok = KeyBoards.pressTab();
      this.setData({ status: ok ? 'pressTab 成功' : 'pressTab 失败' });
    } catch (e) {
      this.setData({ status: 'pressTab 异常: ' + e });
    }
  },
  onSpace() {
    if (!this.ensureIme()) {
      return;
    }
    try {
      var ok = KeyBoards.pressSpace();
      this.setData({ status: ok ? 'pressSpace 成功' : 'pressSpace 失败' });
    } catch (e) {
      this.setData({ status: 'pressSpace 异常: ' + e });
    }
  },
  onHide() {
    try {
      var ok = KeyBoards.hide();
      this.setData({ status: ok ? 'hide 成功' : 'hide 失败' });
    } catch (e) {
      this.setData({ status: 'hide 异常: ' + e });
    }
  }
});
