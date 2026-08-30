Page({
  data: { step: 1, tone: 1 },
  onPrev() {
    var n = this.data.step;
    if (n > 0) {
      this.setData({ step: n - 1 });
    }
  },
  onNext() {
    var n = this.data.step;
    if (n < 2) {
      this.setData({ step: n + 1 });
    }
  }
});
