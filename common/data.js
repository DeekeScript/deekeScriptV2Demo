module.exports = {
  metrics: [
    { label: '运行中', value: '3' },
    { label: '已完成', value: '128' },
    { label: '排队', value: '8' },
    { label: '失败', value: '2' }
  ],
  apps: [
    { id: 'dy', name: '点击控件', title: '点击控件', desc: '按节点查找并点击', tag: '无障碍', task_name: '点击控件', keyword: '确定\n下一步', jsFile: 'tasks/follow.js', icon: 'img/dy.svg' },
    { id: 'xhs', name: '图色查找', title: '图色查找', desc: '按图片或颜色定位坐标', tag: '图色', task_name: '图色查找', keyword: '按钮.png', jsFile: 'tasks/sample.js', icon: 'img/xhs.svg' },
    { id: 'ks', name: '循环任务', title: '循环任务', desc: '按间隔重复执行脚本', tag: '定时', task_name: '循环任务', keyword: '60', jsFile: 'tasks/sample.js', icon: 'img/ks.svg' }
  ],
  tags: [
    { label: '脚本' },
    { label: '无障碍' },
    { label: '图色' },
    { label: '悬浮球' }
  ],
  tasks: [
    { id: 1, title: '点击控件', status: '运行中', user: '脚本A', time: '10:21', jsFile: 'tasks/follow.js', icon: 'img/dy.svg' },
    { id: 2, title: '图色查找', status: '排队', user: '脚本B', time: '10:40', jsFile: 'tasks/sample.js', icon: 'img/xhs.svg' },
    { id: 3, title: '循环任务', status: '已完成', user: '脚本A', time: '09:12', jsFile: 'tasks/sample.js', icon: 'img/ks.svg' },
    { id: 4, title: '定时执行', status: '失败', user: '脚本C', time: '08:55', jsFile: 'tasks/sample.js', icon: 'img/like.svg' },
    { id: 5, title: '日志回传', status: '排队', user: '脚本B', time: '08:30', jsFile: 'tasks/follow.js', icon: 'img/dy.svg' }
  ],
  stats: [
    { id: 11, title: '今日点击 12 次', time: '10:21', status: '完成', icon: 'img/avatar-1.svg', jsFile: 'tasks/sample.js', user: '脚本A' },
    { id: 12, title: '今日滑动 36 次', time: '11:08', status: '进行中', icon: 'img/avatar-2.svg', jsFile: 'tasks/sample.js', user: '脚本B' },
    { id: 13, title: '今日找图 8 次', time: '14:02', status: '完成', icon: 'img/avatar-3.svg', jsFile: 'tasks/sample.js', user: '脚本A' },
    { id: 14, title: '今日找色 5 次', time: '15:40', status: '等待', icon: 'img/avatar-4.svg', jsFile: 'tasks/sample.js', user: '脚本C' },
    { id: 15, title: '今日回传 3 次', time: '16:12', status: '完成', icon: 'img/xhs.svg', jsFile: 'tasks/sample.js', user: '脚本B' },
    { id: 16, title: '子脚本 2 条', time: '17:05', status: '失败', icon: 'img/dy.svg', jsFile: 'tasks/sample.js', user: '脚本A' },
    { id: 17, title: '补跑任务 1 次', time: '18:00', status: '等待', icon: 'img/ks.svg', jsFile: 'tasks/sample.js', user: '脚本C' },
    { id: 18, title: '清理过期日志', time: '18:30', status: '等待', icon: 'img/like.svg', jsFile: 'tasks/sample.js', user: '脚本B' }
  ],
  find(id) {
    var want = String(id == null ? '' : id);
    var lists = [this.tasks, this.apps, this.stats];
    for (var i = 0; i < lists.length; i++) {
      for (var j = 0; j < lists[i].length; j++) {
        if (String(lists[i][j].id) === want) {
          return lists[i][j];
        }
      }
    }
    return null;
  }
};
