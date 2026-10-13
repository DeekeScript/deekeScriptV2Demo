# DeekeScript Pro 组件展厅 Demo

本仓库是 **组件 / 接口 / 能力展厅**，用来预览 UI、自动化脚本 API、悬浮球与悬浮窗等。  
**不是** AI 生成工程的默认模板。生成工程请遵循 [DeekeScriptV2Agent](https://github.com/DeekeScript/DeekeScriptV2Agent) 的 `AGENTS.md`。

**仓库地址：** [https://github.com/DeekeScript/deekeScriptV2Demo](https://github.com/DeekeScript/deekeScriptV2Demo)

手机端 **DeekeScript Pro** 底栏「示例」会内置运行本工程；要看 / 改源码，请克隆本仓库后用 **VsCode + DeekeScript Pro 扩展** 打开。

入口文件：项目根目录的 **`deekeScript.json`**。用 **DeekeScript Pro** 扩展打开本目录即可预览。

## 底部 Tab

- 首页：工作台示意，点卡片进详情，滑到底会加载
- 组件：各组件示例页入口
- 接口：Device / Storage / Http / Sqlite 等脚本 API 组合示例
- 能力：下拉刷新、悬浮球、悬浮窗、底部菜单等

## 接口 Tab

按文档模块分组；每页只覆盖一小簇相关 API：

| 分组 | 页面 |
|------|------|
| 节点与手势 | `apiUi`、`apiGesture`、`apiKeyBoards` |
| 图色 | `apiImages`、`apiColors`（含 Colors.find）、`apiOcr` |
| 应用与系统 | `apiDevice`、`apiSystem`、`apiApp`（含 Intent 广播）、`apiAlipay`（orderString 调起支付）、`apiQrCode`（本地二维码）、`apiShare`（系统分享）、`apiEnv`（含 DeekeScriptJson）、`apiEvents`、`apiSensors`、`apiTimer`、`apiConsole` |
| 存储 | `apiStorage`（list/zip）、`apiData`、`apiMediaStore`（数量统计） |
| 网络 | `apiHttp`、`apiWebSocket`、`apiSocketIo`（需自备服务）、`apiCos`（仅说明，需密钥） |
| 媒体 | `apiAudio`、`apiScreenRecord` |
| 运行与扩展 | `apiDialogs`、`apiEngines`、`apiModule`、`apiPromise`、`apiThreads`、`apiCrypto`、`apiExtend`、`apiNotify`、`apiSms`、`apiForeground`、`apiAccess`（含电池优化豁免）、`apiDeviceOwner`（只读）、`apiHid`（连接探测） |

需自备条件才能完整体验：腾讯云密钥（Cos）、Socket.IO 服务端、Device Owner、蓝牙 HID 硬件。详细 API 以文档为准。

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
- `tasks/floatPage.js` — 打开 `floats/status` 悬浮窗并用 `FloatPage.setData` 推进度

展厅里的 `permission.hint(...)` **仅用于本 Demo 教学占位**，生成真实工程时不要照抄。

## 悬浮球停任务

- 菜单「停止」：`onTap` + `FloatWindow.on` 里写 `FloatWindow.stopTask()`
- **不要**在页面按钮 / 菜单回调里用 `Engines.closeAll()`（无效）；任务脚本内自动结束才用 `Engines.closeAll()`

## 悬浮窗 FloatPage

- 目录：`floats/status/page.json` + `page.js`（不必写入 `pages` / `tabBar`）
- 展厅页：能力 → **悬浮窗**（`pages/floatPage`）
- 与悬浮球 menus **不是一回事**：球管开始/停止；FloatPage 管 JSON 悬浮窗界面

## require

`page.js` 和任务脚本都可以 `require`。推荐相对当前文件；不以 `./`/`../` 开头时相对项目根。

本展厅部分历史代码仍写 `require('common/xxx.js')`（相对项目根），能跑；**新代码与 Agent 生成请用相对路径**。
