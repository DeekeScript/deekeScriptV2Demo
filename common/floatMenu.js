/**
 * 悬浮球菜单（V2）。
 *
 * 任务脚本、页面 JS 都可以 bind()。
 * 点图标可启动 / 停止、隐藏、跳过，并可切换被点图标的文案和底色。
 *
 * 启动脚本请用 Engines.executeScript；JSON 里配了 action: "start"
 * 时由框架执行当前任务，不会走到这里的 start 回调。
 */

function defaultMenus() {
  return [
    { id: 'start', icon: 'play', label: '开始', action: 'start', show: 'idle' },
    { id: 'stop', icon: 'close', label: '停止', action: 'stop', show: 'running' },
    { id: 'hide', icon: 'hide', label: '隐藏', action: 'hide' },
    { id: 'skip', icon: 'img/skip.svg', label: '跳过', onTap: 'onSkip', show: 'running' }
  ];
}

function compactMenus() {
  return [
    { id: 'start', icon: 'play', label: '开始', action: 'start', show: 'idle' },
    { id: 'stop', icon: 'close', label: '停止', action: 'stop', show: 'running' },
    { id: 'hide', icon: 'hide', label: '隐藏', action: 'hide' }
  ];
}

function extraMenus() {
  return [
    { id: 'start', icon: 'play', label: '开始', action: 'start', show: 'idle' },
    { id: 'stop', icon: 'close', label: '停止', action: 'stop', show: 'running' },
    { id: 'hide', icon: 'hide', label: '隐藏', action: 'hide' },
    { id: 'skip', icon: 'img/skip.svg', label: '跳过', onTap: 'onSkip', show: 'running' },
    { id: 'log', icon: 'img/setting.svg', label: '日志', onTap: 'onLog' }
  ];
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

module.exports = {
  bind: bind,
  skipped: skipped,
  defaultMenus: defaultMenus,
  compactMenus: compactMenus,
  extraMenus: extraMenus,
  applyMenus: applyMenus
};
