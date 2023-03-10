import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  addHWDevice,
  removeHWDevice,
  setCurrentDevice,
  setHardwareWalletDevices,
} from '@hardwareWallet/store/actions';
import { subscribeToLedgerDeviceEvents } from '@libs/ledgerHardwareWallet/ledgerDeviceListener/subscribeToLedgerDevices';
import {
  selectCurrentHWDevice,
  selectHardwareDevices,
} from '@hardwareWallet/store/selectors/hwSelectors';
import { getConnectedHWDevices } from '@libs/ledgerHardwareWallet/ledgerLiskAppIPCChannel/ledgerLiskAppClientIPCRequest';

export function useLedgerDeviceListener() {
  const dispatch = useDispatch();
  const hwDevices = useSelector(selectHardwareDevices);
  const currentDevice = useSelector(selectCurrentHWDevice);
  console.log('DDD hwDevices currentDevice', { hwDevices, currentDevice });
  const [hasCheckedHWDevices, setHasCheckedHWDevices] = useState(false);
  const { ipc } = window;

  useEffect(() => {
    if (ipc && dispatch && !hasCheckedHWDevices) {
      // Necessary for keeping HW state on electron start and during page window.reload
      (async () => {
        try {
          console.log('111 AWAITING');
          const connectedDevices = await getConnectedHWDevices();
          console.log('111 connectedDevices', connectedDevices);
          dispatch(setHardwareWalletDevices(connectedDevices));
          dispatch(setCurrentDevice(connectedDevices[0]));
          console.log('1111 DISPATCH');
          setHasCheckedHWDevices(true);
        } catch (error) {
          console.log('111 useLedgerDeviceListener error', error);
          setHasCheckedHWDevices(true);
        }
      })();
    }
  }, [ipc, dispatch, hasCheckedHWDevices]);

  useEffect(() => {
    if (hasCheckedHWDevices) {
      // Update Devices on NODE HID events
      console.log('1111 setting up NODE HID events ');
      subscribeToLedgerDeviceEvents((data) => {
        const { type, device } = data;
        console.log('1111 useLedgerDeviceListener data: ', data);

        if (type === 'remove') {
          dispatch(removeHWDevice(device)).then((res) => {
            console.log('useLedgerDeviceListener REMOVE res', res);
          });
        }
        if (type === 'add') {
          console.log('useLedgerDeviceListener ADD');
          dispatch(addHWDevice(device)).then((res) => {
            console.log('useLedgerDeviceListener ADD res', res);
          });
        }
      });
    }
  }, [hasCheckedHWDevices]);
}
