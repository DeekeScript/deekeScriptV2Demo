function summarize(values) {
  if (!values) {
    return '-';
  }
  try {
    if (typeof values.join === 'function') {
      return values.map(function (v) {
        return typeof v === 'number' ? v.toFixed(2) : '' + v;
      }).join(', ');
    }
    return '' + values;
  } catch (e) {
    return '' + values;
  }
}

Page({
  data: {
    listText: '-',
    hasLight: '-',
    reading: '-',
    listening: '未监听',
    status: 'Sensors.list / has；用 light 采样，离开页面会 unregister'
  },
  onLoad() {
    this.refreshMeta();
  },
  onUnload() {
    this.stopListen();
  },
  onHide() {
    this.stopListen();
  },
  refreshMeta() {
    var list = [];
    try {
      list = Sensors.list() || [];
    } catch (e) {
      list = [];
    }
    var text = list.length ? list.slice(0, 8).join(', ') + (list.length > 8 ? '…' : '') : '(无可用传感器)';
    this.setData({
      listText: text,
      hasLight: Sensors.has('light') ? '支持 light' : '不支持 light'
    });
  },
  stopListen() {
    try {
      Sensors.unregister('light');
    } catch (e) {
    }
    this._listening = false;
    this.setData({ listening: '未监听' });
  },
  onRefresh() {
    this.refreshMeta();
    this.toast('已刷新列表');
  },
  onStart() {
    if (!Sensors.has('light')) {
      this.setData({ status: '本机无 light 传感器，可改用 accelerometer 等' });
      this.toast('不支持 light');
      return;
    }
    if (this._listening) {
      this.toast('已在监听');
      return;
    }
    var that = this;
    var ok = Sensors.register('light', function (e) {
      that.setData({
        reading: summarize(e && e.values),
        status: 'light 回调 · ' + System.time()
      });
      console.log('sensors light', e && e.values);
    }, 500);
    this._listening = !!ok;
    this.setData({
      listening: ok ? '监听中' : '注册失败',
      status: ok ? 'Sensors.register(light, 500ms)' : 'register 失败'
    });
    this.toast(ok ? '已开始' : '注册失败');
  },
  onStop() {
    this.stopListen();
    this.setData({ status: 'Sensors.unregister(light)' });
    this.toast('已停止');
  }
});
