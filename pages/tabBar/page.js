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
  onRename() {
    this.setTabBarItem({ page: 'pages/components', title: '控件' });
  },
  onRestoreName() {
    this.setTabBarItem({ page: 'pages/components', title: '组件' });
  },
  onOrangeText() {
    this.setTabBarStyle({ color: '#C2410C', selectedColor: '#EA580C' });
  },
  onOrangeIcon() {
    this.setTabBarStyle({ iconColor: '#C2410C', selectedIconColor: '#EA580C' });
  },
  onDarkBar() {
    this.setTabBarStyle({ background: '#1A1A1A', borderColor: '#333333' });
  },
  onLightBar() {
    this.setTabBarStyle({ background: '#FFFFFF', borderColor: '#EEEEEE' });
  }
});
