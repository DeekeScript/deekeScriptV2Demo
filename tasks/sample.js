/**
 * 示例任务（展厅占位）。
 * 生成真实工程时：按 Agent task-template 写业务；不要抄 permission.hint。
 */
let permission = require('../common/permission.js');
let floatMenu = require('../common/floatMenu.js');

if (!permission.ensureRun()) {
  // 无障碍 / 悬浮窗未开启，已弹窗引导
} else {
  let state = {};
  floatMenu.bind(state);
  FloatDialogs.toast('示例任务运行中，可点悬浮球停止或跳过');
  let i = 0;
  while (i < 60 && !floatMenu.skipped(state)) {
    console.log('sample tick', i);
    System.sleep(1000);
    i++;
  }
  Engines.closeAll();
}
