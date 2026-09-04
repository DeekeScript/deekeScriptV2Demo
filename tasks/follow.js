/**
 * 第二份示例任务入口（展厅占位）。
 * 生成真实工程时：按 Agent task-template 写业务；不要抄 permission.hint。
 */
let permission = require('../common/permission.js');
let floatMenu = require('../common/floatMenu.js');

if (!permission.ensureRun()) {
} else {
  let state = {};
  floatMenu.bind(state);
  FloatDialogs.toast('follow 示例运行中，可点悬浮球停止或跳过');
  let i = 0;
  while (i < 60 && !floatMenu.skipped(state)) {
    console.log('follow tick', i);
    System.sleep(1000);
    i++;
  }
  Engines.closeAll();
}
