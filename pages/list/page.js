Page({
  data: {
    tasks: [
      { id: 1, title: '今日关注 12 人', time: '10:21', status: '完成', icon: 'img/avatar-1.svg', jsFile: 'tasks/sample.js' },
      { id: 2, title: '今日点赞 36 次', time: '11:08', status: '进行中', icon: 'img/avatar-2.svg', jsFile: 'tasks/sample.js' },
      { id: 3, title: '今日评论 8 条', time: '14:02', status: '完成', icon: 'img/avatar-3.svg', jsFile: 'tasks/sample.js' },
      { id: 4, title: '今日收藏 5 个', time: '15:40', status: '等待', icon: 'img/avatar-4.svg', jsFile: 'tasks/sample.js' },
      { id: 5, title: '今日转发 3 次', time: '16:12', status: '完成', icon: 'img/xhs.svg', jsFile: 'tasks/sample.js' },
      { id: 6, title: '私信回复 2 条', time: '17:05', status: '失败', icon: 'img/dy.svg', jsFile: 'tasks/sample.js' },
      { id: 7, title: '补发笔记 1 篇', time: '18:00', status: '等待', icon: 'img/ks.svg', jsFile: 'tasks/sample.js' },
      { id: 8, title: '清理无效粉丝', time: '18:30', status: '等待', icon: 'img/like.svg', jsFile: 'tasks/sample.js' }
    ],
    loading: false,
    noMore: false,
    footer: ''
  },
  onRun(e) {
    Engines.executeScript(e.item.jsFile);
  },
  onReachBottom() {
    if (this.data.loading || this.data.noMore) {
      return;
    }
    this.setData({ loading: true });
    System.sleep(2000);
    this.setData({ loading: false, noMore: true, footer: '—— 我是有底线的 ——' });
  }
});
