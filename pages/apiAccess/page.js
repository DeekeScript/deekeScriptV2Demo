var permission = require('../../common/permission.js');

function safe(fn) {
  try {
    return !!fn();
  } catch (e) {
    return false;
  }
}

/** @return 'on' | 'denied' | 'off' */
function runtimeState(hasFn, deniedFn) {
  try {
    if (hasFn()) {
      return 'on';
    }
  } catch (e) {
    return 'off';
  }
  try {
    if (deniedFn && deniedFn()) {
      return 'denied';
    }
  } catch (e2) {}
  return 'off';
}

Page({
  data: {
    summary: '-',
    missing: '-',
    denied: '-',
    status: 'Access 全量检测 / 申请'
  },
  onLoad() { this.refresh(); },
  onShow() { this.refresh(); },
  refresh() {
    var items = [
      { name: '无障碍', state: safe(function () { return Access.isAccessibilityServiceEnabled(); }) ? 'on' : 'off' },
      { name: '悬浮窗', state: safe(function () { return Access.isFloatWindowsEnabled(); }) ? 'on' : 'off' },
      { name: '后台弹窗', state: safe(function () { return Access.isBackgroundAlertEnabled(); }) ? 'on' : 'off' },
      { name: '录屏', state: safe(function () { return Access.isMediaProjectionEnable(); }) ? 'on' : 'off' },
      { name: '通知', state: safe(function () { return Access.hasNotificationAccess(); }) ? 'on' : 'off' },
      {
        name: '媒体',
        state: runtimeState(
          function () { return Access.hasMediaReadPermission(); },
          function () { return Access.isMediaPermissionPermanentlyDenied(); }
        )
      },
      {
        name: '存储',
        state: runtimeState(
          function () { return Access.hasStoragePermission(); },
          function () { return Access.isStoragePermissionPermanentlyDenied(); }
        )
      },
      {
        name: '位置',
        state: runtimeState(
          function () { return Access.hasLocationPermission(); },
          function () { return Access.isLocationPermissionPermanentlyDenied(); }
        )
      },
      {
        name: '蓝牙',
        state: runtimeState(
          function () { return Access.hasBluetoothConnectionPermission(); },
          function () { return Access.isBluetoothPermissionPermanentlyDenied(); }
        )
      },
      {
        name: '短信',
        state: runtimeState(
          function () { return Access.hasSmsPermission(); },
          function () { return Access.isSmsPermissionPermanentlyDenied(); }
        )
      },
      {
        name: '摄像头',
        state: runtimeState(
          function () { return Access.hasCameraPermission(); },
          function () { return Access.isCameraPermissionPermanentlyDenied(); }
        )
      },
      {
        name: '麦克风',
        state: runtimeState(
          function () { return Access.hasRecordAudioPermission(); },
          function () { return Access.isRecordAudioPermissionPermanentlyDenied(); }
        )
      },
      { name: '修改系统设置', state: safe(function () { return Access.canWriteSettings(); }) ? 'on' : 'off' }
    ];

    var on = 0;
    var missing = [];
    var denied = [];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (it.state === 'on') {
        on++;
      } else if (it.state === 'denied') {
        denied.push(it.name);
      } else {
        missing.push(it.name);
      }
    }

    this.setData({
      summary: '已开启 ' + on + ' / 共 ' + items.length,
      missing: missing.length ? missing.join('、') : '无',
      denied: denied.length ? denied.join('、') : '无',
      status: '已刷新 · ' + System.time()
    });
  },
  onRefresh() {
    this.refresh();
    this.toast('已刷新');
  },
  _afterEnsure(name, ok) {
    var that = this;
    this.setData({ status: ok ? name + ' 已具备' : name + ' 已引导申请/设置' });
    this.toast(ok ? '已开启' : '请在弹窗或设置中操作');
    setTimeout(function () { that.refresh(); }, 800);
  },
  onAppSettings() {
    Access.openPermissionSettings();
    this.setData({ status: '已 openPermissionSettings' });
  },
  onA11y() { this._afterEnsure('无障碍', permission.ensureAccessibility()); },
  onFloat() { this._afterEnsure('悬浮窗', permission.ensureFloat()); },
  onBgAlert() { this._afterEnsure('后台弹窗', permission.ensureBackgroundAlert()); },
  onScreen() { this._afterEnsure('录屏', permission.ensureScreenCapture()); },
  onNotify() { this._afterEnsure('通知', permission.ensureNotification()); },
  onWriteSettings() { this._afterEnsure('修改系统设置', permission.ensureWriteSettings()); },
  onMedia() { this._afterEnsure('媒体', permission.ensureMedia()); },
  onStorage() { this._afterEnsure('存储', permission.ensureStorage()); },
  onLocation() { this._afterEnsure('位置', permission.ensureLocation()); },
  onBluetooth() { this._afterEnsure('蓝牙', permission.ensureBluetooth()); },
  onCamera() { this._afterEnsure('摄像头', permission.ensureCamera()); },
  onMic() { this._afterEnsure('麦克风', permission.ensureRecordAudio()); },
  onSms() { this._afterEnsure('短信', permission.ensureSms()); },

  onRawA11y() {
    Access.openAccessibilityServiceSetting();
    this.setData({ status: 'openAccessibilityServiceSetting' });
  },
  onRawFloat() {
    Access.openFloatWindowsSetting();
    this.setData({ status: 'openFloatWindowsSetting' });
  },
  onRawBg() {
    Access.openBackgroundAlertSetting();
    this.setData({ status: 'openBackgroundAlertSetting' });
  },
  onRawScreen() {
    Access.openMediaProjectionSetting();
    this.setData({ status: 'openMediaProjectionSetting' });
  },
  onRawNotify() {
    Access.requestNotificationAccess();
    this.setData({ status: 'requestNotificationAccess' });
  },
  onRawMedia() {
    Access.requestMediaPermissions();
    this.setData({ status: 'requestMediaPermissions' });
    var that = this;
    setTimeout(function () { that.refresh(); }, 800);
  },
  onRawStorage() {
    Access.requestStoragePermission();
    this.setData({ status: 'requestStoragePermission' });
    var that = this;
    setTimeout(function () { that.refresh(); }, 800);
  },
  onRawLocation() {
    Access.requestLocationPermissions();
    this.setData({ status: 'requestLocationPermissions' });
    var that = this;
    setTimeout(function () { that.refresh(); }, 800);
  },
  onRawBt() {
    Access.requestBluetoothConnectionPermission();
    this.setData({ status: 'requestBluetoothConnectionPermission' });
    var that = this;
    setTimeout(function () { that.refresh(); }, 800);
  },
  onRawBtSettings() {
    Access.openBluetoothPermissionSettings();
    this.setData({ status: 'openBluetoothPermissionSettings' });
  },
  onRawCamera() {
    Access.requestCameraPermission();
    this.setData({ status: 'requestCameraPermission' });
    var that = this;
    setTimeout(function () { that.refresh(); }, 800);
  },
  onRawMic() {
    Access.requestRecordAudioPermission();
    this.setData({ status: 'requestRecordAudioPermission' });
    var that = this;
    setTimeout(function () { that.refresh(); }, 800);
  },
  onRawSms() {
    Access.requestSmsPermission();
    this.setData({ status: 'requestSmsPermission' });
    var that = this;
    setTimeout(function () { that.refresh(); }, 800);
  },
  onRawWrite() {
    Access.openWriteSettings();
    this.setData({ status: 'openWriteSettings' });
  }
});
