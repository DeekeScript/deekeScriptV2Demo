/**
 * 悬浮球菜单（展厅）。
 *
 * 内置 action: start / stop / hide 由框架处理；stop ≈ FloatWindow.stopTask()。
 * 自定义项（skip / log 等）必须 FloatWindow.on 绑定。
 * 页面按钮停任务用 FloatWindow.stopTask()；任务内自动结束用 Engines.closeAll()。
 */

function extras() {
  return [
    { id: 'hide', icon: 'img/hide.svg', label: '隐藏', action: 'hide' },
    { id: 'skip', icon: 'img/skip.svg', label: '跳过', onTap: 'onSkip' },
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

/** 1–5 个图标。开始/停止成对，展开时只出现其中一个。 */
function menusForCount(count) {
  var n = count;
  if (n < 1) n = 1;
  if (n > 5) n = 5;
  var items = [
    { id: 'start', icon: 'img/play.svg', label: '开始', action: 'start', show: 'idle' },
    { id: 'stop', icon: 'img/stop.svg', label: '停止', action: 'stop', show: 'running' }
  ];
  var rest = extras();
  var i;
  for (i = 0; i < n - 1 && i < rest.length; i++) {
    items.push(rest[i]);
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
