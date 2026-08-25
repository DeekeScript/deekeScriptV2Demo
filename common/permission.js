/**
 * 权限检查（运行脚本前调用）。
 *
 * 默认会检查：无障碍、悬浮窗。
 * 下面还提供了录屏/截图、后台弹窗、通知、媒体、文件、位置、蓝牙，
 * 业务需要时自己 ensureXxx() 即可。
 *
 * 用法：
 *   let permission = require('common/permission.js');
 *   permission.runScript('tasks/sample.js');
 *
 * 任务脚本里：
 *   let permission = require('common/permission.js');
 *   if (!permission.ensureRun()) return;
 *   permission.hint('tasks/sample.js');
 */

function confirmOpen(content, openSetting) {
  Dialogs.confirm('温馨提示', content, function (ok) {
    if (ok) {
      openSetting();
    }
  });
  return false;
}

/** 无障碍 */
function ensureAccessibility() {
  if (Access.isAccessibilityServiceEnabled()) {
    return true;
  }
  return confirmOpen('请开启无障碍权限', function () {
    Access.openAccessibilityServiceSetting();
  });
}

/** 悬浮窗 */
function ensureFloat() {
  if (Access.isFloatWindowsEnabled()) {
    return true;
  }
  return confirmOpen('请开启悬浮窗权限', function () {
    Access.openFloatWindowsSetting();
  });
}

/** 录屏 / 截图（图色查找） */
function ensureScreenCapture() {
  if (Access.isMediaProjectionEnable()) {
    return true;
  }
  return confirmOpen('请开启屏幕截图（录屏）权限', function () {
    Access.openMediaProjectionSetting();
  });
}

/** 后台弹窗 */
function ensureBackgroundAlert() {
  if (Access.isBackgroundAlertEnabled()) {
    return true;
  }
  return confirmOpen('请开启后台弹窗权限', function () {
    Access.openBackgroundAlertSetting();
  });
}

/** 通知读取 */
function ensureNotification() {
  if (Access.hasNotificationAccess()) {
    return true;
  }
  return confirmOpen('请开启通知读取权限', function () {
    Access.requestNotificationAccess();
  });
}

/** 媒体（相册 / 视频 / 音频） */
function ensureMedia() {
  if (Access.hasMediaReadPermission()) {
    return true;
  }
  if (Access.isMediaPermissionPermanentlyDenied()) {
    return confirmOpen('媒体权限已被禁止，请在设置中手动开启', function () {
      Access.openPermissionSettings();
    });
  }
  Access.requestMediaPermissions();
  return false;
}

/** 文件读写 */
function ensureStorage() {
  if (Access.hasStoragePermission()) {
    return true;
  }
  if (Access.isStoragePermissionPermanentlyDenied()) {
    return confirmOpen('文件权限已被禁止，请在设置中手动开启', function () {
      Access.openPermissionSettings();
    });
  }
  Access.requestStoragePermission();
  return false;
}

/** 位置 */
function ensureLocation() {
  if (Access.hasLocationPermission()) {
    return true;
  }
  if (Access.isLocationPermissionPermanentlyDenied()) {
    return confirmOpen('位置权限已被禁止，请在设置中手动开启', function () {
      Access.openPermissionSettings();
    });
  }
  Access.requestLocationPermissions();
  return false;
}

/** 蓝牙（Hid） */
function ensureBluetooth() {
  if (Access.hasBluetoothConnectionPermission()) {
    return true;
  }
  if (Access.isBluetoothPermissionPermanentlyDenied()) {
    return confirmOpen('蓝牙权限已被禁止，请在设置中手动开启', function () {
      Access.openBluetoothPermissionSettings();
    });
  }
  Access.requestBluetoothConnectionPermission();
  return false;
}

/**
 * 运行脚本前必须通过：无障碍 + 悬浮窗。
 * 未开启会弹窗引导，并返回 false。
 */
function ensureRun() {
  var missing = [];
  if (!Access.isAccessibilityServiceEnabled()) {
    missing.push('无障碍权限');
  }
  if (!Access.isFloatWindowsEnabled()) {
    missing.push('悬浮窗权限');
  }
  if (!missing.length) {
    return true;
  }
  return confirmOpen('请先开启' + missing.join('、'), function () {
    if (!Access.isAccessibilityServiceEnabled()) {
      Access.openAccessibilityServiceSetting();
      return;
    }
    Access.openFloatWindowsSetting();
  });
}

function hint(jsFile) {
  Dialogs.show('温馨提示', '请在文件 ' + jsFile + ' 中编写业务逻辑');
}

function runScript(jsFile) {
  if (!jsFile) {
    Dialogs.show('温馨提示', '没有可执行的脚本文件');
    return false;
  }
  if (!ensureRun()) {
    return false;
  }
  Engines.executeScript(jsFile);
  return true;
}

module.exports = {
  ensureRun: ensureRun,
  runScript: runScript,
  hint: hint,
  ensureAccessibility: ensureAccessibility,
  ensureFloat: ensureFloat,
  ensureScreenCapture: ensureScreenCapture,
  ensureBackgroundAlert: ensureBackgroundAlert,
  ensureNotification: ensureNotification,
  ensureMedia: ensureMedia,
  ensureStorage: ensureStorage,
  ensureLocation: ensureLocation,
  ensureBluetooth: ensureBluetooth
};
