Component({
  data: {
    q: '',
    tab: 'all',
    label: '全部',
    allBg: '#006A65',
    allColor: '#FFFFFF',
    runBg: '#EEF2F1',
    runColor: '#006A65',
    doneBg: '#EEF2F1',
    doneColor: '#006A65'
  },
  emit() {
    this.triggerEvent('change', {
      q: this.data.q,
      tab: this.data.tab
    });
  },
  paint(tab) {
    var onBg = '#006A65';
    var onFg = '#FFFFFF';
    var offBg = '#EEF2F1';
    var offFg = '#006A65';
    var labels = { all: '全部', run: '进行中', done: '已完成' };
    this.setData({
      tab: tab,
      label: labels[tab] || '全部',
      allBg: tab === 'all' ? onBg : offBg,
      allColor: tab === 'all' ? onFg : offFg,
      runBg: tab === 'run' ? onBg : offBg,
      runColor: tab === 'run' ? onFg : offFg,
      doneBg: tab === 'done' ? onBg : offBg,
      doneColor: tab === 'done' ? onFg : offFg
    });
  },
  onInput(e) {
    var q = e && e.value != null ? e.value : (this.data.q || '');
    this.setData({ q: q });
    this.emit();
  },
  pickAll() {
    this.paint('all');
    this.emit();
  },
  pickRun() {
    this.paint('run');
    this.emit();
  },
  pickDone() {
    this.paint('done');
    this.emit();
  }
});
