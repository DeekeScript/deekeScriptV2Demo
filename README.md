# DeekeScript V2 示例

用 `deekeScript-v2.json` 作为入口。在 DeekeScript 里打开本目录即可预览。

## 底部 Tab

- 首页：工作台、运行脚本、各样式页入口
- 表单：输入、区间、选择、开关、进度
- 列表：卡片列表、触底加载、运行脚本、进详情
- 我的：静态信息、运行示例脚本

## 运行脚本

不要写在 JSON 的 `action` 里。在 `page.js` 的 `onClick` 里调用：

```javascript
Engines.executeScript('tasks/sample.js');
```

- `tasks/sample.js`：基础执行
- `tasks/follow.js`：脚本内再用 `require('common/hello.js')`

## require

`page.js` 和任务脚本都可以 `require`。`./`、`../` 相对当前文件；否则相对项目根目录。

首页：`require('common/hello.js')` 与 `require('./helper.js')`。
