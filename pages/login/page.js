Page({
  data: {
    account: '',
    password: '',
    remember: true
  },
  onLoad() {
    let account = Storage.get('v2demo.account');
    if (account) {
      this.setData({ account: account, remember: true });
    }
  },
  onLogin() {
    var account = String(this.data.account || '').trim();
    if (!account) {
      System.toast('请输入账号');
      return;
    }
    if (!this.data.password) {
      System.toast('请输入密码');
      return;
    }
    if (this.data.remember) {
      Storage.put('v2demo.account', account);
    } else {
      Storage.put('v2demo.account', '');
    }
    System.toast('欢迎回来');
  }
});
