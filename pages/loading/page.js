Page({
  data: {
    loading: true,
    done: false,
    spinOnly: true
  },
  onStart() {
    this.setData({ loading: true, done: false, spinOnly: true });
  },
  onDone() {
    this.setData({ loading: false, done: true, spinOnly: false });
  }
});
