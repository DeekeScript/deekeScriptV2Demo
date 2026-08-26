function restoreTabBar() {
  this.setTabBar();
}

Page({
  onShow() {
    this.setTabBar({
      items: [
        { title: '首页', icon: 'img/home.svg', page: 'pages/home' },
        { title: '组件', icon: 'img/apps.svg', page: 'pages/components', badge: 3 },
        { title: '能力', icon: 'img/setting.svg', page: 'pages/ability' }
      ]
    });
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
