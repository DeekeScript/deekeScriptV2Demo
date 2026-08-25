Component({
  data: {
    q: '',
    tab: 'all',
    label: '全部'
  },
  emit() {
    this.triggerEvent('change', {
      q: this.data.q,
      tab: this.data.tab
    });
  },
  onInput(e) {
    var q = e && e.value != null ? e.value : (this.data.q || '');
    this.setData({ q: q });
    this.emit();
  },
  pickAll() {
    this.setData({ tab: 'all', label: '全部' });
    this.emit();
  },
  pickRun() {
    this.setData({ tab: 'run', label: '进行中' });
    this.emit();
  },
  pickDone() {
    this.setData({ tab: 'done', label: '已完成' });
    this.emit();
  }
});
