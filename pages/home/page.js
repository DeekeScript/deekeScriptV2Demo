let hello = require('common/hello.js');
let helper = require('./helper.js');

Page({
  data: {
    hello: helper.greet('体验者'),
    hint: hello.runHint,
    clock: '--:--:--',
    date: '',
    tags: ['养号', '关注', '私信'],
    metrics: [
      { label: '组件', value: '26' },
      { label: '页面', value: '17' },
      { label: '表单', value: '10' },
      { label: '布局', value: '4' }
    ],
    entries: [
      { name: '文案', icon: 'img/dy.svg', page: 'pages/text' },
      { name: '标签', icon: 'img/like.svg', page: 'pages/tag' },
      { name: '选项卡', icon: 'img/home.svg', page: 'pages/tabs' },
      { name: '图片', icon: 'img/xhs.svg', page: 'pages/image' },
      { name: '按钮', icon: 'img/ks.svg', page: 'pages/button' },
      { name: '布局', icon: 'img/like.svg', page: 'pages/layout' },
      { name: '宫格', icon: 'img/home.svg', page: 'pages/grid' },
      { name: '进度', icon: 'img/records.svg', page: 'pages/progress' },
      { name: '加载', icon: 'img/setting.svg', page: 'pages/loading' },
      { name: '居中页', icon: 'img/dy.svg', page: 'pages/center' },
      { name: '无标题', icon: 'img/xhs.svg', page: 'pages/plain' },
      { name: '深色顶栏', icon: 'img/ks.svg', page: 'pages/contrast' }
    ]
  },
  onLoad() {
    this.tick();
    var page = this;
    this.timer = setInterval(function () {
      page.tick();
    }, 1000);
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  tick() {
    var d = new Date();
    function pad(n) {
      return n < 10 ? '0' + n : '' + n;
    }
    this.setData({
      clock: pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()),
      date: d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
    });
  },
  onRunSample() {
    Engines.executeScript('tasks/sample.js');
  },
  onRunFollow() {
    Engines.executeScript('tasks/follow.js');
  }
});
