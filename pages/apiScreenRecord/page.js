var permission = require('../../common/permission.js');

Page({
  data: {
    perm: '-',
    outPath: '-',
    status: 'ScreenRecord.start / stop'
  },
  onShow() { this.onCheck(); },
  onCheck() {
    var ok = false;
    try { ok = !!Access.isMediaProjectionEnable(); } catch (e) {}
    this.setData({ perm: ok ? '已开启' : '未开启' });
  },
  onRequest() {
    permission.ensureScreenCapture();
    this.onCheck();
  },
  onStart() {
    if (!Access.isMediaProjectionEnable()) {
      this.setData({ status: '请先开启录屏权限' });
      this.toast('无权限');
      return;
    }
    var path = Files.getCachePath() + '/v2demo_record.mp4';
    try {
      var ok = ScreenRecord.start(path, 4000000, 30, false);
      this.setData({
        outPath: path,
        status: ok ? '录制中，约 3 秒后可 stop' : 'start 失败'
      });
      var that = this;
      if (ok) {
        setTimeout(function () {
          try {
            ScreenRecord.stop();
            that.setData({ status: '已自动 stop' });
            that.toast('录制结束');
          } catch (e2) {
            that.setData({ status: 'stop: ' + e2 });
          }
        }, 3000);
      }
    } catch (e) {
      this.setData({ status: '异常: ' + e });
    }
  },
  onStop() {
    try {
      ScreenRecord.stop();
      this.setData({ status: 'ScreenRecord.stop()' });
    } catch (e) {
      this.setData({ status: 'stop: ' + e });
    }
  }
});
