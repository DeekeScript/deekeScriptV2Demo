Page({
  data: {
    cat: 'follow',
    title: '关注',
    desc: '查看关注相关任务'
  },
  onCat(e) {
    var v = e && e.value ? e.value : this.data.cat;
    var map = {
      follow: { title: '关注', desc: '查看关注相关任务' },
      like: { title: '点赞', desc: '查看点赞相关任务' },
      comment: { title: '评论', desc: '查看评论相关任务' },
      msg: { title: '私信', desc: '查看私信相关任务' }
    };
    var hit = map[v] || map.follow;
    this.setData({ cat: v, title: hit.title, desc: hit.desc });
  }
});
