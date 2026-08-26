let permission = require('common/permission.js');
let floatMenu = require('common/floatMenu.js');

if (!permission.ensureRun()) {
  // 无障碍 / 悬浮窗未开启，已弹窗引导
} else {
  let state = {};
  floatMenu.bind(state);
  permission.hint('tasks/sample.js');
  // 保持运行，方便点悬浮球：停止 / 隐藏 / 跳过
  let i = 0;
  while (i < 60 && !floatMenu.skipped(state)) {
    System.sleep(1000);
    i++;
  }
}
