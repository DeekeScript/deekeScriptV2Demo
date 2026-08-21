Page({
  data: {
    hello: '你好，这是 V2 示例',
    metrics: [
      { label: '组件', value: '19' },
      { label: '页面', value: '15' },
      { label: '表单', value: '7' },
      { label: '布局', value: '4' }
    ],
    entries: [
      { name: '文案', icon: 'img/dy.svg', page: 'pages/text' },
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
    // let data = JSON.parse(Http.get('https://example.com/dke/home'));
    // this.setData(data);
  }
});
