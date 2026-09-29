Page({
  data: {
    result: '(空)',
    status: 'Rhino 用 Promise + then，不要写 async/await'
  },
  onThen() {
    var that = this;
    this.setData({ status: '等待 setTimeout…', result: 'pending' });
    var promise = new Promise(function (resolve) {
      setTimeout(function () {
        resolve('成功 · ' + System.time());
      }, 800);
    });
    promise.then(function (value) {
      that.setData({
        result: '' + value,
        status: 'then 已回调'
      });
      that.toast('then');
    }, function (err) {
      that.setData({ result: '' + err, status: 'rejected' });
    });
  },
  onReject() {
    var that = this;
    var promise = new Promise(function (resolve, reject) {
      reject('演示失败');
    });
    promise.then(function (value) {
      that.setData({ result: '' + value, status: 'resolved' });
    }, function (err) {
      that.setData({
        result: '' + err,
        status: 'reject 回调 · ' + System.time()
      });
      that.toast('reject');
    });
  }
});
