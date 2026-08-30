Page({
  data: {
    range: 'day',
    hint: '查看今日数据',
    tone: 'blue'
  },
  onRange(e) {
    var v = e && e.value ? e.value : this.data.range;
    var map = { day: '查看今日数据', week: '查看本周数据', month: '查看本月数据' };
    this.setData({ range: v, hint: map[v] || '' });
  }
});
