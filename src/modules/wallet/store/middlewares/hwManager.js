/* import React from 'react';
import { toast } from 'react-toastify';
import DeviceToast from '@hardwareWallet/components/DeviceToast/DeviceToast';
import { addSearchParamsToUrl } from 'src/utils/searchParams';
import history from 'src/utils/history'; */
import actionTypes from 'src/modules/common/store/actionTypes';
/* import { subscribeToLedgerDeviceEvents } from '@libs/ledgerHardwareWallet/ledgerDeviceListener/subscribeToLedgerDevices';
import { addHWDevice, removeHWDevice } from '@hardwareWallet/store/actions';
import {
  subscribeToDeviceConnected,
  subscribeToDeviceDisconnected,
} from '@libs/hwServer/communication'; */
// import { getConnectedHWDevices } from '@libs/ledgerHardwareWallet/ledgerLiskAppIPCChannel/ledgerLiskAppClientIPCRequest';

const hwWalletMiddleware = () => (next) => (action) => {
  const { ipc } = window;
  // console.log('subscribeToLedgerDeviceEvents 1111');

  if (action.type === actionTypes.storeCreated && ipc) {
/*    const ok = await getConnectedHWDevices();
    console.log('getConnectedHWDevices ok', ok);
    getConnectedHWDevices()
      .then((res) => {
        console.log('getConnectedHWDevices Than res', res);
      })
      .catch((error) => {
        console.log('getConnectedHWDevices catch error', error);
      })
      .finally((res) => {
        console.log('getConnectedHWDevices Finally res', res);
      }); */
    // console.log('subscribeToLedgerDeviceEvents 2222');
    // autoLogInIfNecessary(store);
    /*    subscribeToLedgerDeviceEvents((data) => {
      const { type, device } = data;
      const { dispatch } = store;
      console.log('subscribeToLedgerDeviceEvents ...', data);
      if (type === 'remove') {
        console.log('subscribeToLedgerDeviceEvents REMOVE');
        dispatch(removeHWDevice(device)).then((res) => {
          console.log('subscribeToLedgerDeviceEvents REMOVE res', res);
        });
      }
      if (type === 'add') {
        console.log('subscribeToLedgerDeviceEvents ADD');
        dispatch(addHWDevice(device)).then((res) => {
          console.log('subscribeToLedgerDeviceEvents ADD res', res);
        });
      }
    }); */
    /*    /!**
     * subscribeToDeviceConnected - Function -> To detect any new hw wallet device connection
     * @param {fn} function - callback function to execute toast dispatch after receive the data
     *!/
    subscribeToDeviceConnected((response) => {
      const { model, deviceLength } = response;
      const label = `${model} connected.`;
      console.log('subscribeToDeviceConnected...');
      toast.info(
        <DeviceToast label={label} showSelectHardwareDeviceModalLink={deviceLength > 1} />
      );
    });

    /!**
     * subscribeToDeviceDisconnected - Function -> To detect any hw wallet disconnection
     * @param {fn} function - callback function to execute toast dispatch after receive the data
     * and in case user is SignIn trigger the logout Dialog and toast message.
     *!/
    subscribeToDeviceDisconnected((response) => {
      const { wallet, token } = store.getState();
      const activeToken = token.active;

      // Check if user is SignedIn
      if (
        wallet.info &&
        wallet.info[activeToken] &&
        wallet.info[activeToken].address &&
        wallet.hwInfo.deviceId &&
        wallet.hwInfo.deviceModel === response.model
      ) {
        addSearchParamsToUrl(history, { modal: 'deviceDisconnectDialog', model: response.model });
        // store.dispatch(accountLoggedOut());
      }

      toast.error(`${response.model} disconnected`);
    }); */
  }

  next(action);
};

export default hwWalletMiddleware;
