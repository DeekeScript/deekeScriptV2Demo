let hello = require('common/hello.js');

Page({
  data: {
    nickname: '体验账号',
    desc: hello.text,
    tags: ['养号', '关注', '私信'],
    version: '1.0.0'
  },
  onRunSample() {
    Engines.executeScript('tasks/sample.js');
  }
});
