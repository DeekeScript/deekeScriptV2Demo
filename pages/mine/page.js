let hello = require('common/hello.js');
let permission = require('common/permission.js');

Page({
  data: {
    nickname: '体验账号',
    desc: hello.text,
    tags: ['养号', '关注', '私信'],
    version: '1.0.0'
  },
  onRunSample() {
    permission.runScript('tasks/sample.js');
  }
});
