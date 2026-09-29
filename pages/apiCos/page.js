Page({
  data: {
    cfg: '未配置',
    status: '腾讯云 COS 需 secretId / secretKey'
  },
  onShow() {
    this.setData({ status: 'Cos.setConfig + upload · ' + System.time() });
  },
  onHint() {
    Dialogs.show(
      '说明',
      '使用前调用：\n' +
      'Cos.setConfig(secretId, secretKey, region, bucket)\n' +
      '再 Cos.upload(localPath, cosKey) 或 uploadAsync。\n' +
      '展厅不内置密钥，请在自有工程填写后调用。'
    );
  },
  onDemoCode() {
    this.setData({
      cfg: 'Cos.setConfig(id, key, region, bucket)\nCos.upload(path, key)',
      status: '已展示调用模板（未实际上传）'
    });
  }
});
