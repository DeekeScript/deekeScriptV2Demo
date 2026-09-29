var permission = require('../../common/permission.js');

Page({
  data: {
    childCount: '0',
    status: 'Engines 另起独立运行时；先拉起脚本再刷新计数'
  },
  onShow() {
    this.refreshCount();
  },
  refreshCount() {
    var n = 0;
    try {
      n = Engines.childScriptCount();
      if (n == null || n !== n) {
        n = 0;
      }
    } catch (e) {
      n = -1;
    }
    this.setData({
      childCount: '' + n,
      status: n > 0
        ? ('当前有 ' + n + ' 个子脚本')
        : '当前无子脚本（主任务不计入；需在主任务里再拉起）'
    });
    return n;
  },
  scheduleRefresh() {
    var that = this;
    var times = [200, 600, 1200, 2500];
    for (var i = 0; i < times.length; i++) {
      (function (ms) {
        setTimeout(function () {
          that.refreshCount();
        }, ms);
      })(times[i]);
    }
  },
  onRefresh() {
    var n = this.refreshCount();
    this.toast(n > 0 ? ('计数 ' + n) : '暂无运行中脚本');
  },
  onRunStr() {
    // 多睡一会儿，便于观察到 childScriptCount > 0
    Engines.executeScriptStr(
      'v2demo-engines',
      "console.log('executeScriptStr start'); System.sleep(3000); console.log('executeScriptStr done');"
    );
    this.setData({ status: '已拉起字符串脚本（约 3s），请看计数变化' });
    this.scheduleRefresh();
    this.toast('已拉起');
  },
  onRunFile() {
    var ok = permission.runScript('tasks/sample.js');
    this.setData({
      status: ok ? '已拉起 tasks/sample.js，请看计数变化' : '权限未就绪或未执行'
    });
    if (ok) {
      this.scheduleRefresh();
    }
  },
  onCloseOther() {
    try {
      Engines.closeOther();
      this.setData({ status: '已 Engines.closeOther()' });
      this.refreshCount();
      this.toast('已 closeOther');
    } catch (e) {
      this.setData({ status: 'closeOther 异常: ' + e });
      this.toast('失败');
    }
  }
});
