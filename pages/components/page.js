Page({
  data: {
    display: [
      { name: '文案', desc: 'text / title / notice', page: 'pages/text' },
      { name: '标签', desc: 'tag', page: 'pages/tag' },
      { name: '角标', desc: 'badge', page: 'pages/badge' },
      { name: '图片', desc: 'image', page: 'pages/image' },
      { name: '网页', desc: 'webview', page: 'pages/webview' },
      { name: '空状态', desc: 'empty', page: 'pages/empty' }
    ],
    forms: [
      { name: '按钮', desc: 'button', page: 'pages/button' },
      { name: '输入框', desc: 'input 下划线 / 边框', page: 'pages/input' },
      { name: '多行', desc: 'textarea', page: 'pages/textarea' },
      { name: '搜索', desc: 'search', page: 'pages/search' },
      { name: '区间', desc: 'range', page: 'pages/range' },
      { name: '开关', desc: 'switch', page: 'pages/switch' },
      { name: '下拉', desc: 'select', page: 'pages/select' },
      { name: '复选', desc: 'checkbox', page: 'pages/checkbox' },
      { name: '单选', desc: 'radio', page: 'pages/radio' },
      { name: '进度', desc: 'progress / slider', page: 'pages/progress' },
      { name: '选择卡片', desc: 'card 单选 / 多选', page: 'pages/cards' },
      { name: '省市区', desc: 'menu 多列选择器', page: 'pages/menu' },
      { name: '时间选择', desc: 'date / time / datetime', page: 'pages/picker' },
      { name: '综合表单', desc: '多字段拼一页 + 持久化', page: 'pages/form' }
    ],
    structure: [
      { name: '布局', desc: 'row / column / card', page: 'pages/layout' },
      { name: '列表', desc: 'list', page: 'pages/list' },
      { name: '宫格', desc: 'grid', page: 'pages/grid' },
      { name: '选项卡', desc: 'tabs', page: 'pages/tabs' },
      { name: '弹层', desc: '底部 / 顶部 / 侧边 / 居中；body 里可嵌自定义组件', page: 'pages/popup' },
      { name: '自定义组件', desc: '页面嵌入 / 弹窗嵌入', page: 'pages/include' },
      { name: '加载', desc: 'loading', page: 'pages/loading' }
    ],
    pages: [
      { name: '居中页', desc: 'column valign', page: 'pages/center' },
      { name: '无标题', desc: '隐藏顶栏', page: 'pages/plain' },
      { name: '深色顶栏', desc: 'title 样式', page: 'pages/contrast' },
      { name: '登录', desc: '账号密码登录', page: 'pages/login' },
      { name: '我的', desc: '个人页示例', page: 'pages/mine' }
    ]
  }
});
