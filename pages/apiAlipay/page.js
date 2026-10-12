function formatResult(r) {
  if (r == null) {
    return '无返回';
  }
  try {
    var ok = r.ok === true || String(r.resultStatus) === '9000';
    return 'ok=' + ok +
      ' · resultStatus=' + (r.resultStatus != null ? r.resultStatus : '-') +
      ' · memo=' + (r.memo != null ? r.memo : '-');
  } catch (e) {
    return String(r);
  }
}

Page({
  data: {
    orderString: '',
    result: '粘贴 orderString 后点「Alipay.pay」',
    qrCode: '',
    qrImage: '',
    hasQr: false,
    qrStatus: '粘贴 qrCode 后点「生成扫码图」'
  },

  onPay() {
    var orderString = (this.data.orderString || '').trim();
    if (!orderString) {
      this.toast('请先粘贴 orderString');
      return;
    }
    this.showLoading('正在调起支付宝…');
    var payResult = null;
    try {
      // 不要对 Alipay 使用 typeof（Rhino 会报 JavaScript 值无效）
      payResult = Alipay.pay(orderString);
    } catch (e) {
      this.hideLoading();
      this.setData({ result: '异常: ' + ((e && e.message) || e) });
      this.toast('调起失败');
      return;
    }
    this.hideLoading();
    this.setData({ result: formatResult(payResult) });
    if (Alipay.isSuccess(payResult) || (payResult && payResult.ok)) {
      this.toast('SDK 侧支付成功（请再向服务端确认）');
    } else {
      var memo = payResult && payResult.memo ? String(payResult.memo) : '';
      this.toast(memo || '支付未完成');
    }
  },

  onPayEmpty() {
    this.showLoading('空串试跑…');
    var payResult = null;
    try {
      payResult = Alipay.pay('');
    } catch (e) {
      this.hideLoading();
      this.setData({ result: '异常: ' + ((e && e.message) || e) });
      return;
    }
    this.hideLoading();
    this.setData({ result: formatResult(payResult) });
    this.toast('空串应失败，未调起支付宝属正常');
  },

  onMakeQr() {
    var text = String(this.data.qrCode || '').trim();
    if (!text) {
      this.toast('请先粘贴 qrCode');
      return;
    }
    this.showLoading('生成二维码…');
    var path = null;
    try {
      path = QrCode.toFile(text, {
        size: 400,
        margin: 1,
        level: 'M',
        format: 'png'
      });
    } catch (e) {
      this.hideLoading();
      this.setData({
        hasQr: false,
        qrImage: '',
        qrStatus: '异常: ' + ((e && e.message) || e)
      });
      this.toast('生成失败');
      return;
    }
    this.hideLoading();
    if (!path) {
      this.setData({
        hasQr: false,
        qrImage: '',
        qrStatus: 'QrCode.toFile 返回 null'
      });
      this.toast('生成失败');
      return;
    }
    this.setData({
      hasQr: true,
      qrImage: String(path),
      qrStatus: '已生成 · 请用支付宝扫码；支付结果请轮询服务端订单'
    });
    this.toast('已生成扫码图');
  },

  onOpenQrDemo() {
    this.navigate('pages/apiQrCode');
  }
});
