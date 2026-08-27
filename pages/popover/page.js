Page({
  data: { below: false, above: false, aside: false, light: false, nomask: false },
  onBelow() { this.setData({ below: true, above: false, aside: false, light: false, nomask: false }); },
  onAbove() { this.setData({ above: true, below: false, aside: false, light: false, nomask: false }); },
  onRight() { this.setData({ aside: true, below: false, above: false, light: false, nomask: false }); },
  onLight() { this.setData({ light: true, below: false, above: false, aside: false, nomask: false }); },
  onNomask() { this.setData({ nomask: !this.data.nomask, below: false, above: false, aside: false, light: false }); }
});
