/**
 * 悬浮球菜单（V2）。
 *
 * 任务脚本、页面 JS 都可以 bind()。
 * 点图标可启动 / 停止、隐藏、跳过，并可切换被点图标的文案和底色。
 *
 * 启动脚本请用 Engines.executeScript；JSON 里配了 action: "start"
 * 且当前已有任务文件时由框架执行；否则走这里的 start 回调。
 */

function catalog() {
  return [
    { id: 'stop', icon: 'img/stop.svg', label: '停止', action: 'stop', show: 'running' },
    { id: 'hide', icon: 'img/hide.svg', label: '隐藏', action: 'hide' },
    { id: 'skip', icon: 'img/skip.svg', label: '跳过', onTap: 'onSkip', show: 'running' },
    { id: 'log', icon: 'img/log.svg', label: '日志', onTap: 'onLog' },
    { id: 'setting', icon: 'img/setting.svg', label: '设置', onTap: 'onSetting' }
  ];
}

function defaultMenus() {
  return menusForCount(3);
}

function compactMenus() {
  return menusForCount(3);
}

function extraMenus() {
  return menusForCount(5);
}

/** 和文档演示同一套：1–5 个图标，未满 5 时自动补 idle 的「开始」。 */
function menusForCount(count) {
  var n = count;
  if (n < 1) n = 1;
  if (n > 5) n = 5;
  var body = catalog().slice(0, n);
  var items = [];
  var i;
  for (i = 0; i < body.length; i++) {
    var item = body[i];
    if (item.id === 'stop' && body.length < 5) {
      items.push({ id: 'start', icon: 'img/play.svg', label: '开始', action: 'start', show: 'idle' });
    }
    items.push(item);
  }
  return items;
}

function emit(onEvent, name) {
  if (typeof onEvent === 'function') {
    onEvent(name);
  }
}

function bind(state, onEvent) {
  state = state || {};
  state.skipped = false;
  state.logOn = false;

  FloatWindow.on({
    start: function () {
      Engines.executeScript('tasks/sample.js');
      emit(onEvent, 'start');
    },
    skip: function () {
      state.skipped = true;
      FloatWindow.update('skip', {
        label: '已跳过',
        background: '#E8F5E9'
      });
      emit(onEvent, 'skip');
    },
    log: function () {
      state.logOn = !state.logOn;
      FloatWindow.update('log', {
        label: state.logOn ? '已开' : '日志',
        background: state.logOn ? '#E8F5E9' : '#FFFFFF'
      });
      emit(onEvent, 'log');
    },
    setting: function () {
      FloatWindow.collapse();
      emit(onEvent, 'setting');
    }
  });
  return state;
}

function skipped(state) {
  return !!(state && state.skipped);
}

function applyMenus(menus) {
  FloatWindow.setMenus(menus);
}

function applyCount(count) {
  applyMenus(menusForCount(count));
}

module.exports = {
  bind: bind,
  skipped: skipped,
  defaultMenus: defaultMenus,
  compactMenus: compactMenus,
  extraMenus: extraMenus,
  menusForCount: menusForCount,
  applyMenus: applyMenus,
  applyCount: applyCount
};
