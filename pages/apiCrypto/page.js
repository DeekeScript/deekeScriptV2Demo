var HASH_KEY = 'v2demo.api_md5';

Page({
  data: {
    plain: 'DeekeScript',
    md5: '-',
    sha256: '-',
    b64: '-',
    hmac: '-',
    saved: '-',
    status: 'Encrypt 摘要 / 编码，结果可存入 Storage'
  },
  onLoad() {
    var saved = Storage.get(HASH_KEY);
    this.setData({ saved: saved != null ? saved : '(未保存)' });
  },
  onHash() {
    var text = this.data.plain || '';
    var md5 = Encrypt.md5(text);
    var sha256 = Encrypt.sha256(text);
    var b64 = Encrypt.base64Encode(text);
    var hmac = Encrypt.hmac_sha256('v2demo-secret', text);
    this.setData({
      md5: md5,
      sha256: sha256,
      b64: b64,
      hmac: hmac,
      status: '已计算 md5 / sha256 / base64 / hmac_sha256'
    });
    this.toast('已计算');
  },
  onSave() {
    var md5 = this.data.md5;
    if (!md5 || md5 === '-') {
      this.toast('请先计算');
      return;
    }
    Storage.put(HASH_KEY, md5);
    this.setData({
      saved: md5,
      status: 'Storage.put 已保存 md5'
    });
    this.toast('已保存');
  },
  onDecode() {
    var b64 = this.data.b64;
    if (!b64 || b64 === '-') {
      this.toast('请先计算');
      return;
    }
    var decoded = Encrypt.base64Decode(b64);
    this.setData({ status: 'base64Decode → ' + decoded });
    this.toast('已解码');
  }
});
