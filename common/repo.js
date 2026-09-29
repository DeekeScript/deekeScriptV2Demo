/** 展厅源码仓库（手机端示例看不到工程文件时，用此地址对照代码） */
var SOURCE_URL = 'https://github.com/DeekeScript/deekeScriptV2Demo';

function openSource() {
  try {
    App.openUrl(SOURCE_URL);
  } catch (e) {
    try {
      System.setClip(SOURCE_URL);
      Dialogs.show('示例源码', SOURCE_URL + '\n\n已复制到剪贴板');
    } catch (e2) {
      Dialogs.show('示例源码', SOURCE_URL);
    }
  }
}

function copySource() {
  try {
    System.setClip(SOURCE_URL);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  SOURCE_URL: SOURCE_URL,
  openSource: openSource,
  copySource: copySource
};
