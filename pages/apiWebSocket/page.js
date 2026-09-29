var ECHO = 'wss://echo.websocket.events';

Page({
  data: {
    conn: '未连接',
    latest: '(空)',
    status: 'new WebSocket(url)'
  },
  onUnload() { this.onClose(); },
  onHide() { this.onClose(); },
  onConnect() {
    this.onClose();
    var that = this;
    try {
      var client = new WebSocket(ECHO);
      client.onOpen = function () {
        that.setData({ conn: '已连接', status: 'onOpen' });
        that.toast('已连接');
      };
      client.onMessage = function (msg) {
        that.setData({
          latest: ('' + msg).substring(0, 120),
          status: 'onMessage · ' + System.time()
        });
      };
      client.onClose = function (code, reason) {
        that.setData({
          conn: '已关闭',
          status: 'onClose ' + code + ' ' + (reason || '')
        });
        that._ws = null;
      };
      client.onError = function (err) {
        that.setData({ status: 'onError: ' + err });
      };
      this._ws = client;
      this.setData({ conn: '连接中…', status: '正在连接 ' + ECHO });
    } catch (e) {
      this.setData({ status: '创建失败: ' + e });
    }
  },
  onSend() {
    if (!this._ws) {
      this.toast('请先连接');
      return;
    }
    try {
      this._ws.send('hello from v2demo ' + System.time());
      this.setData({ status: '已 send' });
    } catch (e) {
      this.setData({ status: 'send: ' + e });
    }
  },
  onClose() {
    if (!this._ws) return;
    try {
      this._ws.close();
    } catch (e) {}
    this._ws = null;
    this.setData({ conn: '未连接' });
  }
});
