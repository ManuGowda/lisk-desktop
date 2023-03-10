import actionTypes from '@hardwareWallet/store/actions/actionTypes';
import { getConnectedHWDevices } from '@libs/ledgerHardwareWallet/ledgerLiskAppIPCChannel/ledgerLiskAppClientIPCRequest';

export const setHardwareWalletDevices = (devices) => ({
  type: actionTypes.setHWDevices,
  payload: devices,
});

export const setCurrentDevice = (device) => ({
  type: actionTypes.setCurrentDevice,
  payload: device,
});

export const addHWDevice = (device) => ({
  type: actionTypes.addHWDevice,
  payload: device,
});

export const removeHWDevice = (device) => ({
  type: actionTypes.removeHWDevice,
  payload: device,
});

export function loadConnectedHWDevices() {
  return async function () {
    return getConnectedHWDevices().then((response) => {
      console.log('TEST loadConnectedHWDevices response', response);
    }).catch((error) => {
      console.log('TEST loadConnectedHWDevices error', error);
    }).finally((res) => {
      console.log('TEST loadConnectedHWDevices finally', res);
    });
  };
}
