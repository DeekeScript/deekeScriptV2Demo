Page({
  data: {
    url: 'http://127.0.0.1:3000',
    connected: '未连接',
    log: '(空)',
    status: 'SocketIoClient（需自备 Socket.IO 服务）'
  },
  _client: null,
  onUnload() { this.onDisconnect(); },
  onHide() { this.onDisconnect(); },
  onConnect() {
    var url = (this.data.url || '').trim();
    if (!url) {
      this.setData({ status: '请填写服务地址' });
      return;
    }
    this.onDisconnect();
    var that = this;
    try {
      var client = SocketIoClient.getInstance(url, false, 5000);
      this._client = client;
      client.on('connect', function () {
        that.setData({
          connected: '已连接',
          status: 'connect · ' + System.time(),
          log: 'connected'
        });
      });
      client.on('disconnect', function () {
        that.setData({
          connected: '未连接',
          status: 'disconnect · ' + System.time()
        });
      });
      client.on('message', function (msg) {
        that.setData({
          log: 'message: ' + msg,
          status: '收到 message · ' + System.time()
        });
      });
      client.connect();
      this.setData({ status: '正在连接 ' + url, connected: '连接中…' });
    } catch (e) {
      this.setData({ status: '连接异常: ' + e });
    }
  },
  onEmit() {
    if (!this._client) {
      this.setData({ status: '请先连接' });
      return;
    }
    try {
      this._client.emit('message', 'hello from DeekeScript');
      this.setData({ status: '已 emit message', log: 'sent: hello from DeekeScript' });
    } catch (e) {
      this.setData({ status: 'emit 异常: ' + e });
    }
  },
  onStatus() {
    var ok = false;
    try { ok = !!(this._client && this._client.isConnected()); } catch (e) {}
    this.setData({
      connected: ok ? '已连接' : '未连接',
      status: 'isConnected=' + ok + ' · ' + System.time()
    });
  },
  onDisconnect() {
    if (!this._client) return;
    try {
      this._client.off();
      this._client.disconnect();
    } catch (e) {}
    this._client = null;
    this.setData({ connected: '未连接', status: '已 disconnect' });
  }
});
