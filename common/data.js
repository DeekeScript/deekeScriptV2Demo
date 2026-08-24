module.exports = {
  metrics: [
    { label: '关注', value: '128' },
    { label: '点赞', value: '36' },
    { label: '评论', value: '8' },
    { label: '失败', value: '2' }
  ],
  apps: [
    { id: 'dy', name: '抖音养号', title: '抖音养号', desc: '模拟浏览、点赞、评论，逐步养号', tag: '推荐', task_name: '早间养号', keyword: '美食\n探店\n生活vlog', jsFile: 'tasks/follow.js', icon: 'img/dy.svg' },
    { id: 'xhs', name: '小红书', title: '小红书', desc: '笔记互动、点赞和评论', tag: '笔记', task_name: '笔记互动', keyword: '穿搭\n护肤', jsFile: 'tasks/sample.js', icon: 'img/xhs.svg' },
    { id: 'ks', name: '快手评论', title: '快手评论', desc: '评论区互动，提高账号活跃', tag: '评论', task_name: '评论互动', keyword: '搞笑\n生活', jsFile: 'tasks/sample.js', icon: 'img/ks.svg' }
  ],
  tags: [
    { label: '养号' },
    { label: '私信' },
    { label: '评论' },
    { label: '数据' }
  ],
  tasks: [
    { id: 1, title: '抖音养号', status: '运行中', user: '运营A', time: '10:21', jsFile: 'tasks/follow.js', icon: 'img/dy.svg' },
    { id: 2, title: '小红书笔记', status: '排队', user: '运营B', time: '10:40', jsFile: 'tasks/sample.js', icon: 'img/xhs.svg' },
    { id: 3, title: '快手评论', status: '已完成', user: '运营A', time: '09:12', jsFile: 'tasks/sample.js', icon: 'img/ks.svg' },
    { id: 4, title: '视频号私信', status: '失败', user: '运营C', time: '08:55', jsFile: 'tasks/sample.js', icon: 'img/like.svg' },
    { id: 5, title: '数据回传', status: '排队', user: '运营B', time: '08:30', jsFile: 'tasks/follow.js', icon: 'img/dy.svg' }
  ],
  stats: [
    { id: 11, title: '今日关注 12 人', time: '10:21', status: '完成', icon: 'img/avatar-1.svg', jsFile: 'tasks/sample.js', user: '运营A' },
    { id: 12, title: '今日点赞 36 次', time: '11:08', status: '进行中', icon: 'img/avatar-2.svg', jsFile: 'tasks/sample.js', user: '运营B' },
    { id: 13, title: '今日评论 8 条', time: '14:02', status: '完成', icon: 'img/avatar-3.svg', jsFile: 'tasks/sample.js', user: '运营A' },
    { id: 14, title: '今日收藏 5 个', time: '15:40', status: '等待', icon: 'img/avatar-4.svg', jsFile: 'tasks/sample.js', user: '运营C' },
    { id: 15, title: '今日转发 3 次', time: '16:12', status: '完成', icon: 'img/xhs.svg', jsFile: 'tasks/sample.js', user: '运营B' },
    { id: 16, title: '私信回复 2 条', time: '17:05', status: '失败', icon: 'img/dy.svg', jsFile: 'tasks/sample.js', user: '运营A' },
    { id: 17, title: '补发笔记 1 篇', time: '18:00', status: '等待', icon: 'img/ks.svg', jsFile: 'tasks/sample.js', user: '运营C' },
    { id: 18, title: '清理无效粉丝', time: '18:30', status: '等待', icon: 'img/like.svg', jsFile: 'tasks/sample.js', user: '运营B' }
  ],
  find(id) {
    var want = String(id == null ? '' : id);
    var lists = [this.tasks, this.apps, this.stats];
    for (var i = 0; i < lists.length; i++) {
      for (var j = 0; j < lists[i].length; j++) {
        if (String(lists[i][j].id) === want) {
          return lists[i][j];
        }
      }
    }
    return null;
  }
};
