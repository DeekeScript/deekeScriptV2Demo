Page({
  data: {
    modText: '-',
    modHint: '-',
    status: '点按钮 require 公共模块'
  },
  onRequire() {
    try {
      var hello = require('../../common/hello.js');
      this.setData({
        modText: hello.text || '-',
        modHint: hello.runHint || '-',
        status: 'require 成功'
      });
      this.toast('已加载');
    } catch (e) {
      this.setData({ status: 'require 失败: ' + e });
      this.toast('失败');
    }
  }
});
