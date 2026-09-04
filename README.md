# DeekeScript Pro 组件展厅 Demo

本仓库是 **组件 / 能力展厅**，用来预览 UI 与悬浮球等 API。  
**不是** AI 生成工程的默认模板。生成工程请遵循 [DeekeScriptV2Agent](https://github.com/DeekeScript/DeekeScriptV2Agent) 的 `AGENTS.md`。

入口文件：项目根目录的 **`deekeScript.json`**。用 **DeekeScript Pro** 扩展打开本目录即可预览。

## 底部 Tab

- 首页：工作台示意，点卡片进详情，滑到底会加载
- 组件：各组件示例页入口
- 能力：下拉刷新、悬浮球、底部菜单等

## 运行脚本

不要写在 JSON 的 `action` 里。在 `page.js` 的 `onTap` 里调用：

```javascript
let permission = require('../common/permission.js'); // 页面目录下相对路径
// 或从 pages/xxx：require('../../common/permission.js')
permission.runScript('tasks/sample.js');
```

`Engines.executeScript` / `runScript` 的路径相对**项目根**（如 `tasks/sample.js`）。  
`require` **优先** `./`、`../` 相对当前文件。

示例任务：

- `tasks/sample.js` — 可点悬浮球停止 / 跳过的占位循环
- `tasks/follow.js` — 同上（第二份入口）

展厅里的 `permission.hint(...)` **仅用于本 Demo 教学占位**，生成真实工程时不要照抄。

## 悬浮球停任务

- 菜单「停止」：`onTap` + `FloatWindow.on` 里写 `FloatWindow.stopTask()`
- **不要**在页面按钮 / 菜单回调里用 `Engines.closeAll()`（无效）；任务脚本内自动结束才用 `Engines.closeAll()`

## require

`page.js` 和任务脚本都可以 `require`。推荐相对当前文件；不以 `./`/`../` 开头时相对项目根。

本展厅部分历史代码仍写 `require('common/xxx.js')`（相对项目根），能跑；**新代码与 Agent 生成请用相对路径**。
