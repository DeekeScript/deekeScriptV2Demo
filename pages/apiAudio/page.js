var DEMO_AUDIO = 'https://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3';

Page({
  data: {
    playing: '-',
    duration: '-',
    status: 'Audio load / play / pause / stop'
  },
  onRefresh() {
    var playing = false;
    var dur = '-';
    try { playing = !!Audio.isPlaying(); } catch (e) {}
    try {
      var d = Audio.getDuration();
      dur = d > 0 ? (Math.round(d / 100) / 10) + 's' : '-';
    } catch (e2) {}
    this.setData({
      playing: playing ? '播放中' : '未播放',
      duration: dur
    });
  },
  onLoad() {
    try { Audio.load(DEMO_AUDIO); } catch (e) {}
    this.onRefresh();
  },
  onPlayRelease() {
    try {
      var ok = Audio.playAndRelease(DEMO_AUDIO);
      this.setData({ status: ok ? 'playAndRelease 已调用' : '播放失败' });
      this.toast(ok ? '播放中' : '失败');
    } catch (e) {
      this.setData({ status: '异常: ' + e });
    }
    var that = this;
    setTimeout(function () { that.onRefresh(); }, 500);
  },
  onPlay() {
    try {
      Audio.load(DEMO_AUDIO);
      var ok = Audio.play();
      this.setData({ status: ok === false ? 'play 失败' : 'Audio.play()' });
      this.toast('play');
    } catch (e) {
      this.setData({ status: 'play: ' + e });
    }
    var that = this;
    setTimeout(function () { that.onRefresh(); }, 500);
  },
  onPause() {
    try {
      Audio.pause();
      this.setData({ status: 'Audio.pause()' });
    } catch (e) {
      this.setData({ status: 'pause: ' + e });
    }
    this.onRefresh();
  },
  onStop() {
    try {
      Audio.stop();
      this.setData({ status: 'Audio.stop()' });
    } catch (e) {
      this.setData({ status: 'stop: ' + e });
    }
    this.onRefresh();
  }
});
