import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import { LEDGER_HW_DEVICE_EVENT } from '@libs/ledgerHardwareWallet/constants';

export const ledgerDeviceListener = (win) => {
  TransportNodeHid.listen({
    next: ({ type, device : fullDevice }) => {
      const data = {
        type,
        device: {
          path: fullDevice.path,
          manufacturer: fullDevice.manufacturer,
          product: fullDevice.product,
        },
      };
      console.log('____BE____ ledgerDeviceListener data', data);
      win.send({ event: LEDGER_HW_DEVICE_EVENT, value: data });
    },
  });
};
