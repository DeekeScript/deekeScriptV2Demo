Page({
  data: {
    task_name: '每日关注',
    nickname: '',
    password: '',
    count: '20',
    amount: '',
    phone: '',
    email: '',
    remark: '',
    follow_min: '10',
    follow_max: '80',
    platform: 'xhs',
    enable_comment: true,
    enable_like: false,
    speed: 50
  },
  onLoad() {
    let task_name = Storage.get('v2demo.task_name');
    if (task_name) {
      this.setData({ task_name: task_name });
    }
    let nickname = Storage.get('v2demo.nickname');
    if (nickname) {
      this.setData({ nickname: nickname });
    }
    let remark = Storage.get('v2demo.remark');
    if (remark) {
      this.setData({ remark: remark });
    }
    let platform = Storage.get('v2demo.platform');
    if (platform) {
      this.setData({ platform: platform });
    }
  },
  onSpeedChange(e) {
    this.setData({ speed: e.value });
  },
  onSave() {
    Storage.put('v2demo.task_name', this.data.task_name);
    Storage.put('v2demo.nickname', this.data.nickname);
    Storage.put('v2demo.remark', this.data.remark);
    Storage.put('v2demo.platform', this.data.platform);
    Storage.put('v2demo.follow_min', this.data.follow_min);
    Storage.put('v2demo.follow_max', this.data.follow_max);
    Storage.put('v2demo.speed', this.data.speed);
  }
});
