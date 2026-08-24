# DeekeScript V2 示例

> **特别说明：v2版本正在筹划中，预计2026年底（预计11月左右）对外发布**

用 `deekeScript-v2.json` 作为入口。在 DeekeScript 里打开本目录即可预览。

## 底部 Tab

- 首页：对照文档「概述」的工作台，点卡片进详情，滑到底会加载
- 组件：各组件示例页入口（文案、表单、列表、布局等）
- 记录：任务列表、查询、运行脚本、进详情
- 设置：任务配置表单，保存到本地 Storage

## 运行脚本

不要写在 JSON 的 `action` 里。在 `page.js` 的 `onClick` 里调用：

```javascript
Engines.executeScript('tasks/sample.js');
```

- `tasks/sample.js`：基础执行
- `tasks/follow.js`：脚本内再用 `require('common/hello.js')`

## require

`page.js` 和任务脚本都可以 `require`。`./`、`../` 相对当前文件；否则相对项目根目录。

首页：`require('common/data.js')`、`require('common/line.js')` 与 `require('./helper.js')`。
`tasks/follow.js` 和「我的」页还会 `require('common/hello.js')`。
