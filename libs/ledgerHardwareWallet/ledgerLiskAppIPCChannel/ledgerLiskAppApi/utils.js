import { LedgerAccount } from '@zondax/ledger-lisk';
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";

export const getLedgerAccount = (index = 0) => {
  const ledgerAccount = new LedgerAccount();
  ledgerAccount.account(index);
  return ledgerAccount;
};

// eslint-disable-next-line max-statements
export async function getDevicesFromPaths(devicePaths) {
  const devices = [];
  let transport = TransportNodeHid;
  try {
    // eslint-disable-next-line no-restricted-syntax,no-unused-vars
    for (const devicePath of devicePaths) {
      console.log('getDevicesFromPaths devicePath', devicePath);
      // eslint-disable-next-line no-await-in-loop
      transport = await transport.open(devicePath);
      const deviceInfo = transport.device?.getDeviceInfo();
      // eslint-disable-next-line no-await-in-loop
      await transport?.close();
      devices.push({
        path: devicePath,
        manufacturer: deviceInfo.manufacturer,
        product: deviceInfo.product,
      });
    }
  } catch (error) {
    if (transport && transport.close) await transport.close();
    console.log('getDevicesFromPaths error', error);
    return Promise.reject(Error(error));
  }

  return devices;
}
