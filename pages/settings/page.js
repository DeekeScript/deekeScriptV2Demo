Page({
  data: {
    task_name: '早间养号',
    platform: 'dy',
    notify: true,
    follow_min: '10',
    follow_max: '80',
    remark: '每天上午执行',
    speed: 50
  },
  onLoad() {
    let task_name = Storage.get('v2demo.task_name');
    if (task_name) {
      this.setData({ task_name: task_name });
    }
    let platform = Storage.get('v2demo.platform');
    if (platform) {
      this.setData({ platform: platform });
    }
    let remark = Storage.get('v2demo.remark');
    if (remark) {
      this.setData({ remark: remark });
    }
    // let data = JSON.parse(Http.get('https://example.com/dke/settings'));
    // this.setData(data);
  },
  onSave() {
    Storage.put('v2demo.task_name', this.data.task_name);
    Storage.put('v2demo.platform', this.data.platform);
    Storage.put('v2demo.notify', this.data.notify);
    Storage.put('v2demo.follow_min', this.data.follow_min);
    Storage.put('v2demo.follow_max', this.data.follow_max);
    Storage.put('v2demo.speed', this.data.speed);
    Storage.put('v2demo.remark', this.data.remark);
  }
});
