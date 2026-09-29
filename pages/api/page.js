Page({
  data: {
    node: [
      { name: '节点 UiSelector', desc: '探测 / textContains / exists', page: 'pages/apiUi' },
      { name: '手势 Gesture', desc: 'back / home / recents / swipe', page: 'pages/apiGesture' },
      { name: '键盘 KeyBoards', desc: 'input / delete / Enter', page: 'pages/apiKeyBoards' }
    ],
    vision: [
      { name: '图片 Images', desc: '截图 / 找图 / 裁剪缩放', page: 'pages/apiImages' },
      { name: '取色 Colors', desc: 'Images 找色 + Colors.find', page: 'pages/apiColors' },
      { name: '文字识别 OCR', desc: '识字 / 找字 / waitText', page: 'pages/apiOcr' }
    ],
    device: [
      { name: '设备与系统', desc: 'Device + 剪贴板 / Toast', page: 'pages/apiDevice' },
      { name: '系统函数 System', desc: '振动 / 常亮 / 时间窗 / 包名', page: 'pages/apiSystem' },
      { name: '应用与意图', desc: 'App + Intent 广播', page: 'pages/apiApp' },
      { name: 'Env / DeekeScript', desc: '路径 + Json.toJson', page: 'pages/apiEnv' },
      { name: '事件 Events', desc: 'on / emit / once', page: 'pages/apiEvents' },
      { name: '传感器', desc: 'Sensors.list / register', page: 'pages/apiSensors' },
      { name: '定时器', desc: 'setInterval + console', page: 'pages/apiTimer' },
      { name: '控制台 console', desc: 'log / show / hide', page: 'pages/apiConsole' }
    ],
    persist: [
      { name: '存储与文件', desc: 'Storage + Files list/zip', page: 'pages/apiStorage' },
      { name: '数据库与日志', desc: 'Sqlite + Log', page: 'pages/apiData' },
      { name: '媒体库 MediaStore', desc: '图片/视频/音频数量', page: 'pages/apiMediaStore' }
    ],
    net: [
      { name: '网络请求', desc: 'Http.get / post', page: 'pages/apiHttp' },
      { name: 'WebSocket', desc: '连接 / 发送 / 关闭', page: 'pages/apiWebSocket' },
      { name: 'Socket.IO', desc: 'connect / emit / disconnect', page: 'pages/apiSocketIo' },
      { name: '腾讯云 Cos', desc: 'setConfig / upload 说明', page: 'pages/apiCos' }
    ],
    media: [
      { name: '音频 Audio', desc: 'play / pause / stop', page: 'pages/apiAudio' },
      { name: '屏幕录制', desc: 'ScreenRecord start/stop', page: 'pages/apiScreenRecord' }
    ],
    runtime: [
      { name: '弹窗', desc: 'Dialogs + FloatDialogs', page: 'pages/apiDialogs' },
      { name: 'Engines 运行时', desc: '拉起脚本 + 计数', page: 'pages/apiEngines' },
      { name: '模块 require', desc: '相对路径公共模块', page: 'pages/apiModule' },
      { name: '异步 Promise', desc: 'then / reject，不用 async', page: 'pages/apiPromise' },
      { name: '多线程 Threads', desc: 'create + sleep', page: 'pages/apiThreads' },
      { name: '加解密', desc: 'Encrypt + Storage', page: 'pages/apiCrypto' },
      { name: '扩展 Java', desc: 'java.* / JavaImporter / Packages', page: 'pages/apiExtend' },
      { name: '通知监听', desc: 'NotificationBridge', page: 'pages/apiNotify' },
      { name: '短信 Sms', desc: '权限 / extractCode / 监听', page: 'pages/apiSms' },
      { name: '前台服务', desc: 'ForegroundServiceBridge', page: 'pages/apiForeground' },
      { name: '权限 Access', desc: '汇总检测 / 申请 / 设置', page: 'pages/apiAccess' },
      { name: 'Device Owner', desc: 'isDeviceOwner 只读', page: 'pages/apiDeviceOwner' },
      { name: 'Hid', desc: 'isConnected 探测', page: 'pages/apiHid' }
    ]
  }
});
