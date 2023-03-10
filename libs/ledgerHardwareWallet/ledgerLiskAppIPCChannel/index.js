import { createIpcMainChannel } from '@libs/ledgerHardwareWallet/utils';
import { IPC_LEDGER_CHANNEL } from '@libs/ledgerHardwareWallet/constants';
import {
  getPubKey,
  getConnectedDevices,
  getIsInsideApp,
  getSignedMessage,
  getSignedTransaction,
} from './ledgerLiskAppApi';

const { GET_CONNECTED_DEVICES, SIGN_MSG, GET_IS_INSIDE_APP, GET_PUB_KEY, GET_SIGNED_TRANSACTION } =
  IPC_LEDGER_CHANNEL.TYPE;

export const ledgerLiskAppIPCChannel = () => {
  createIpcMainChannel(IPC_LEDGER_CHANNEL.NAME, (data) => {
    const { channelType, ...payload } = data;
    console.log('ledgerLiskAppIPCChannel channelType', { channelType, payload });

    switch (channelType) {
      case GET_CONNECTED_DEVICES: {
        return getConnectedDevices();
      }
      case SIGN_MSG: {
        return getSignedMessage(payload);
      }
      case GET_SIGNED_TRANSACTION: {
        return getSignedTransaction(payload);
      }
      case GET_IS_INSIDE_APP: {
        return getIsInsideApp(payload);
      }
      case GET_PUB_KEY: {
        return getPubKey(payload);
      }
      default: {
        return 'default';
      }
    }
  });
};
