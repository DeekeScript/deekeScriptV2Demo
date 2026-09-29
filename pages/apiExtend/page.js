Page({
  data: {
    javaText: '-',
    importerText: '-',
    packagesText: '-',
    status: '直接用 java.* / JavaImporter / Packages'
  },
  onJava() {
    try {
      var text = new java.lang.String('Java');
      var pi = java.lang.Math.PI;
      var date = new java.util.Date();
      this.setData({
        javaText: text + ' · PI=' + pi + ' · ' + date,
        status: 'java.lang / java.util · ' + System.time()
      });
      this.toast('已调用 Java 类');
    } catch (e) {
      this.setData({ javaText: '' + e, status: 'java 异常' });
    }
  },
  onImporter() {
    try {
      var importer = JavaImporter(java.lang.Math, java.lang.String);
      var line = '';
      with (importer) {
        line = 'PI=' + Math.PI + ' · ' + new String('Importer');
      }
      this.setData({
        importerText: line,
        status: 'JavaImporter · ' + System.time()
      });
      this.toast('JavaImporter');
    } catch (e) {
      this.setData({ importerText: '' + e, status: 'JavaImporter 异常' });
    }
  },
  onPackages() {
    try {
      var now = Packages.java.lang.System.currentTimeMillis();
      this.setData({
        packagesText: 'currentTimeMillis=' + now,
        status: 'Packages · ' + System.time()
      });
      this.toast('Packages');
    } catch (e) {
      this.setData({ packagesText: '' + e, status: 'Packages 异常' });
    }
  }
});
