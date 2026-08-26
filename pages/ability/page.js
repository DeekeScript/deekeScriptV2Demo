function restoreTabBar() {
  this.setTabBarStyle({
    color: '#6F7978',
    selectedColor: '#006A65',
    background: '#FFFFFF',
    borderColor: '#EEEEEE',
    hidden: false
  });
  this.setTabBarItem({ page: 'pages/home', title: '首页', hidden: false, badge: 0 });
  this.setTabBarItem({ page: 'pages/components', title: '组件', hidden: false, badge: 3 });
  this.setTabBarItem({ page: 'pages/ability', title: '能力', hidden: false, badge: 0 });
}

Page({
  data: {
    items: [
      { name: '下拉刷新', desc: 'onPullDownRefresh 里自己拉数据', page: 'pages/refresh' },
      { name: '悬浮球', desc: '权限 / 显示隐藏 / 展开菜单', page: 'pages/floatWindow' }
    ]
  },
  onHide() {
    restoreTabBar.call(this);
  },
  onUnload() {
    restoreTabBar.call(this);
  },
  onBadge() {
    this.setTabBarItem({ page: 'pages/components', badge: 9 });
  },
  onClearBadge() {
    this.setTabBarItem({ page: 'pages/components', badge: 0 });
  },
  onHideComponents() {
    this.setTabBarItem({ page: 'pages/components', hidden: true });
  },
  onShowComponents() {
    this.setTabBarItem({ page: 'pages/components', hidden: false });
  },
  onDarkBar() {
    this.setTabBarStyle({
      background: '#1A1A1A',
      color: '#9AA8A6',
      selectedColor: '#5EEAD4',
      borderColor: '#333333',
      hidden: false
    });
  },
  onLightBar() {
    this.setTabBarStyle({
      background: '#FFFFFF',
      color: '#6F7978',
      selectedColor: '#006A65',
      borderColor: '#EEEEEE',
      hidden: false
    });
  }
});
