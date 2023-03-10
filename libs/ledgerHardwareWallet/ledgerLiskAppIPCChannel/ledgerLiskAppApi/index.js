/* eslint-disable max-statements */
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import { LiskApp } from '@zondax/ledger-lisk';
import { getDevicesFromPaths, getLedgerAccount } from './utils';

let transporting = false;

export function getPubKey({ devicePath, accountIndex }) {
  console.log('getPubKey devicePath, accountIndex', { devicePath, accountIndex });
  console.log('getPubKey transporting', transporting);
  const _getAddressAndPubKey = async () => {
    let transport = TransportNodeHid;
    try {
      transporting = true;
      transport = await transport.open(devicePath);
      const liskLedger = new LiskApp(transport);
      const ledgerAccount = getLedgerAccount(accountIndex);
      const account = await liskLedger.getAddressAndPubKey(ledgerAccount.derivePath());
      console.log('getPubKey address', account);
      await transport.close();
      const errorMessage = account?.error_message;
      if (errorMessage === 'No errors') {
        return account?.pubKey;
      }
      return Promise.reject(Error(errorMessage));
    } catch (error) {
      console.log('getAddressAndPubKey error', error);
      await transport?.close();
      return Promise.reject(Error(error));
    }
  };
  const key = _getAddressAndPubKey();
  console.log('getPubKey key', key);

  return key;
}

export function getSignedTransaction({ devicePath, accountIndex, unsignedMessage }) {
  const getSignedTransactionAsync = async () => {
    let transport = TransportNodeHid;
    try {
      transport = await transport.open(devicePath);
      const liskLedger = new LiskApp(transport);
      const ledgerAccount = getLedgerAccount(accountIndex);
      const signature = await liskLedger.sign(
        ledgerAccount.derivePath(),
        Buffer.from(unsignedMessage, 'hex')
      );
      await transport?.close();
      return signature;
    } catch (error) {
      if (transport) await transport?.close();
      console.log('getAddressAndPubKey error', error);
      return Promise.reject(Error(error));
    }
  };
  return getSignedTransactionAsync();
}

export function getSignedMessage({ devicePath, accountIndex, unsignedMessage }) {
  const getSignedMessageAsync = async () => {
    let transport = TransportNodeHid;
    try {
      transport = await transport.open(devicePath);
      const liskLedger = new LiskApp(transport);
      const ledgerAccount = getLedgerAccount(accountIndex);
      const signature = await liskLedger.sign(
        ledgerAccount.derivePath(),
        Buffer.from(unsignedMessage, 'hex')
      );
      await transport?.close();
      return signature;
    } catch (error) {
      if (transport) await transport.close();
      return Promise.reject(Error(error));
    }
  };

  return getSignedMessageAsync();
}

export function getIsInsideApp({ devicePath, accountIndex }) {
  const getIsInsideAppAsync = async () => {
    let transport = TransportNodeHid;
    try {
      transport = await transport.open(devicePath);
      const liskLedger = new LiskApp(transport);
      const ledgerAccount = getLedgerAccount(accountIndex);
      const account = await liskLedger.getAddressAndPubKey(ledgerAccount.derivePath());
      console.log('GET_IS_INSIDE_APP account', account);
      if (transport && transport.close) await transport.close();
      return account?.error_message === 'No errors';
    } catch (error) {
      console.log('GET_IS_INSIDE_APP error', error.toString());
      if (transport && transport.close) await transport.close();
      return Promise.resolve(false);
    }
  };

  return getIsInsideAppAsync();
}

export function getConnectedDevices() {
  const getConnectedDevicesAsync = async () => {
    try {
      transporting = true;
      const devicePaths = await TransportNodeHid.list();
      if (devicePaths?.length > 0) {
        const devices = await getDevicesFromPaths(devicePaths, TransportNodeHid);
        return devices;
      }
      transporting = false;
      return [];
    } catch (error) {
      transporting = false;
      console.log('getConnectedDevices error', error?.toString());
      // throw new Error(error);
      return Promise.reject(Error(error));
    }
  };
  return getConnectedDevicesAsync();
}
