Page({
  data: {
    plan: 'year',
    apps: ['xhs']
  },
  onSelectPlan(e) {
    this.setData({ plan: e.value });
  },
  onToggleApp(e) {
    var apps = this.data.apps ? this.data.apps.slice() : [];
    var i = apps.indexOf(e.value);
    if (i >= 0) {
      apps.splice(i, 1);
    } else {
      apps.push(e.value);
    }
    this.setData({ apps: apps });
  }
});
