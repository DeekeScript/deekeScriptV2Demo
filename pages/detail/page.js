Page({
  data: {
    item: {
      title: '任务详情',
      status: '未知',
      time: '',
      desc: '从列表点进来会带上 id。',
      jsFile: 'tasks/sample.js'
    }
  },
  onLoad(params) {
    let all = {
      '1': { title: '今日关注 12 人', status: '完成', time: '10:21', desc: '已完成关注任务。' },
      '2': { title: '今日点赞 36 次', status: '进行中', time: '11:08', desc: '点赞任务执行中。' },
      '3': { title: '今日评论 8 条', status: '完成', time: '14:02', desc: '评论已发送。' },
      '4': { title: '今日收藏 5 个', status: '等待', time: '15:40', desc: '排队等待执行。' },
      '5': { title: '今日转发 3 次', status: '完成', time: '16:12', desc: '转发完成。' },
      '6': { title: '私信回复 2 条', status: '失败', time: '17:05', desc: '对方账号异常。' },
      '7': { title: '补发笔记 1 篇', status: '等待', time: '18:00', desc: '草稿待发布。' },
      '8': { title: '清理无效粉丝', status: '等待', time: '18:30', desc: '尚未开始。' }
    };
    let found = all[params.id];
    if (found) {
      found.jsFile = 'tasks/sample.js';
      this.setData({ item: found });
    }
  },
  onRun() {
    Engines.executeScript(this.data.item.jsFile);
  }
});
