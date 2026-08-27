Page({
  data: { open: false, result: '未操作' },
  onOpen() { this.setData({ open: true }); },
  onOk() { this.setData({ result: '已删除' }); },
  onNo() { this.setData({ result: '已取消' }); }
});
