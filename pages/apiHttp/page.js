var DEMO_URL = 'https://myip.ipip.net';
var POST_URL = 'https://httpbin.org/post';

function summarize(res) {
  if (res == null) return '(空响应)';
  if (typeof res === 'string') {
    return res.length > 220 ? res.substring(0, 220) + '…' : res;
  }
  try {
    var text = JSON.stringify(res);
    return text.length > 220 ? text.substring(0, 220) + '…' : text;
  } catch (e) {
    return '' + res;
  }
}

Page({
  data: {
    online: '-',
    netType: '-',
    url: DEMO_URL,
    status: 'Http.get / post；先检测联网',
    body: '-'
  },
  onLoad() { this.refreshNet(); },
  refreshNet() {
    var online = false;
    var type = '-';
    try {
      online = !!Device.isNetworkConnected();
      type = online ? Device.getNetworkType() : 'None';
    } catch (e) {
      type = '读取失败';
    }
    this.setData({
      online: online ? '已联网' : '未联网',
      netType: type || '-'
    });
    return online;
  },
  onCheck() {
    var online = this.refreshNet();
    this.toast(online ? '网络可用' : '当前未联网');
  },
  onGet() {
    if (!this.refreshNet()) {
      this.setData({ status: '未联网', body: '-' });
      this.toast('请先联网');
      return;
    }
    this.setData({ status: 'GET 中…', body: '-' });
    try {
      var res = Http.get(DEMO_URL);
      this.setData({ status: 'Http.get 完成', body: summarize(res) });
      this.toast('GET 完成');
    } catch (e) {
      this.setData({ status: 'GET 异常', body: '' + e });
      this.toast('失败');
    }
  },
  onPost() {
    if (!this.refreshNet()) {
      this.setData({ status: '未联网', body: '-' });
      this.toast('请先联网');
      return;
    }
    this.setData({ status: 'POST 中…', body: '-' });
    try {
      var res = Http.post(POST_URL, { demo: 'deeke', t: System.time() });
      this.setData({ status: 'Http.post 完成', body: summarize(res) });
      this.toast('POST 完成');
    } catch (e) {
      this.setData({ status: 'POST 异常（部分地区 httpbin 不可达）', body: '' + e });
      this.toast('失败');
    }
  }
});
