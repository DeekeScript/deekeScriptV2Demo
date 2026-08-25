Page({
  data: {
    open: false,
    picked: '未选',
    all: [
      { title: '关注达人', user: '运营A', status: '进行中', tab: 'run' },
      { title: '点赞评论', user: '运营B', status: '已完成', tab: 'done' },
      { title: '私信回访', user: '运营A', status: '进行中', tab: 'run' },
      { title: '采集笔记', user: '运营C', status: '已完成', tab: 'done' }
    ],
    list: [
      { title: '关注达人', user: '运营A', status: '进行中', tab: 'run' },
      { title: '点赞评论', user: '运营B', status: '已完成', tab: 'done' },
      { title: '私信回访', user: '运营A', status: '进行中', tab: 'run' },
      { title: '采集笔记', user: '运营C', status: '已完成', tab: 'done' }
    ],
    count: 4
  },
  onLoad() {
    this.apply('', 'all');
  },
  onOpen() {
    this.setData({ open: true });
  },
  onPicked(e) {
    var keyword = e && e.detail ? e.detail.keyword : '';
    this.setData({ open: false, picked: keyword || '未选' });
  },
  onFilter(e) {
    var d = e && e.detail ? e.detail : {};
    this.apply(d.q || '', d.tab || 'all');
  },
  apply(q, tab) {
    var all = this.data.all || [];
    var list = [];
    var i;
    for (i = 0; i < all.length; i++) {
      var item = all[i];
      var hitTab = tab === 'all' || item.tab === tab;
      var hitQ = !q || (item.title && item.title.indexOf(q) >= 0);
      if (hitTab && hitQ) {
        list.push(item);
      }
    }
    this.setData({ list: list, count: list.length });
  }
});
