# DeekeScript V2 示例

> **特别说明：v2版本正在筹划中，预计2026年底（预计11月左右）对外发布**

用 `deekeScript-v2.json` 作为入口。在 DeekeScript 里打开本目录即可预览。

## 底部 Tab

- 首页：对照文档「概述」的工作台，点卡片进详情，滑到底会加载
- 组件：各组件示例页入口（文案、表单、列表、布局等）
- 能力：下拉刷新、悬浮球、底部菜单入口。底部菜单是独立页，进入时创建底栏，返回恢复默认

## 运行脚本

不要写在 JSON 的 `action` 里。在 `page.js` 的 `onTap` 里调用（会先检查无障碍、悬浮窗）：

```javascript
let permission = require('common/permission.js');
permission.runScript('tasks/sample.js');
```

权限判断都在 `common/permission.js`。运行起来后会弹窗提示到对应任务文件里写业务。

- `tasks/sample.js`
- `tasks/follow.js`

## require

`page.js` 和任务脚本都可以 `require`。`./`、`../` 相对当前文件；否则相对项目根目录。

首页：`require('common/data.js')`、`require('common/line.js')` 与 `require('./helper.js')`。
`tasks/follow.js` 和「我的」页还会 `require('common/hello.js')`。
