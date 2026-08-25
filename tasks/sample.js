let permission = require('common/permission.js');

if (!permission.ensureRun()) {
  // 无障碍 / 悬浮窗未开启，已弹窗引导
} else {
  permission.hint('tasks/sample.js');
}
