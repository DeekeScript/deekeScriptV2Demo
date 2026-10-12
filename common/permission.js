/**
 * 权限检查（运行脚本前调用）。
 *
 * 默认检查：无障碍、悬浮窗。其它权限按业务调用 ensureXxx()。
 *
 *   let permission = require('../common/permission.js');
 *   permission.runScript('tasks/sample.js');
 *
 *   if (!permission.ensureRun()) { ... } else { ... }
 *
 * hint() 仅本展厅教学占位，生成工程禁止使用。
 */

function confirmOpen(content, openSetting) {
  Dialogs.confirm('提示', content, function (ok) {
    if (ok) {
      openSetting();
    }
  });
  return false;
}

/** 已有权限则 true；永久拒绝则引导设置；否则 request 并返回 false */
function ensureRuntime(opts) {
  if (opts.has()) {
    return true;
  }
  if (opts.isDenied && opts.isDenied()) {
    return confirmOpen(opts.deniedMsg, function () {
      if (opts.openDenied) {
        opts.openDenied();
      } else {
        Access.openPermissionSettings();
      }
    });
  }
  opts.request();
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
  return ensureRuntime({
    has: function () { return Access.hasMediaReadPermission(); },
    isDenied: function () { return Access.isMediaPermissionPermanentlyDenied(); },
    deniedMsg: '媒体权限已被禁止，请在设置中手动开启',
    request: function () { Access.requestMediaPermissions(); }
  });
}

/** 文件读写 */
function ensureStorage() {
  return ensureRuntime({
    has: function () { return Access.hasStoragePermission(); },
    isDenied: function () { return Access.isStoragePermissionPermanentlyDenied(); },
    deniedMsg: '文件权限已被禁止，请在设置中手动开启',
    request: function () { Access.requestStoragePermission(); }
  });
}

/** 位置 */
function ensureLocation() {
  return ensureRuntime({
    has: function () { return Access.hasLocationPermission(); },
    isDenied: function () { return Access.isLocationPermissionPermanentlyDenied(); },
    deniedMsg: '位置权限已被禁止，请在设置中手动开启',
    request: function () { Access.requestLocationPermissions(); }
  });
}

/** 摄像头（Images.takePhoto） */
function ensureCamera() {
  return ensureRuntime({
    has: function () { return Access.hasCameraPermission(); },
    isDenied: function () { return Access.isCameraPermissionPermanentlyDenied(); },
    deniedMsg: '摄像头权限已被禁止，请在设置中手动开启',
    request: function () { Access.requestCameraPermission(); }
  });
}

/** 麦克风（Audio.startRecord） */
function ensureRecordAudio() {
  return ensureRuntime({
    has: function () { return Access.hasRecordAudioPermission(); },
    isDenied: function () { return Access.isRecordAudioPermissionPermanentlyDenied(); },
    deniedMsg: '麦克风权限已被禁止，请在设置中手动开启',
    request: function () { Access.requestRecordAudioPermission(); }
  });
}

/** 短信（Sms.startListening） */
function ensureSms() {
  return ensureRuntime({
    has: function () { return Access.hasSmsPermission(); },
    isDenied: function () { return Access.isSmsPermissionPermanentlyDenied(); },
    deniedMsg: '短信权限已被禁止，请在设置中手动开启',
    request: function () { Access.requestSmsPermission(); }
  });
}

/** 蓝牙（Hid） */
function ensureBluetooth() {
  return ensureRuntime({
    has: function () { return Access.hasBluetoothConnectionPermission(); },
    isDenied: function () { return Access.isBluetoothPermissionPermanentlyDenied(); },
    deniedMsg: '蓝牙权限已被禁止，请在设置中手动开启',
    openDenied: function () { Access.openBluetoothPermissionSettings(); },
    request: function () { Access.requestBluetoothConnectionPermission(); }
  });
}

/** 修改系统设置（亮度等） */
function ensureWriteSettings() {
  if (Access.canWriteSettings()) {
    return true;
  }
  return confirmOpen('请开启「修改系统设置」权限', function () {
    Access.openWriteSettings();
  });
}

/** 电池优化豁免（省电白名单 / 不优化本应用） */
function openBatteryIgnore() {
  Access.openIgnoreBatteryOptimizationSettings();
}

function ensureBatteryHint() {
  if (Access.isIgnoringBatteryOptimizations()) {
    return true;
  }
  return confirmOpen('请允许忽略电池优化，避免脚本被系统杀掉', function () {
    Access.requestIgnoreBatteryOptimizations();
  });
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
  // 展厅专用：提醒去对应文件写业务。生成工程不要调用。
  Dialogs.show('提示', '请在文件 ' + jsFile + ' 中编写业务逻辑');
}

function runScript(jsFile) {
  if (!jsFile) {
    Dialogs.show('提示', '没有可执行的脚本文件');
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
  ensureCamera: ensureCamera,
  ensureRecordAudio: ensureRecordAudio,
  ensureSms: ensureSms,
  ensureBluetooth: ensureBluetooth,
  ensureWriteSettings: ensureWriteSettings,
  ensureBatteryHint: ensureBatteryHint,
  openBatteryIgnore: openBatteryIgnore
};
