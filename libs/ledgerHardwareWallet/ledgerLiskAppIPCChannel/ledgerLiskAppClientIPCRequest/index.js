import { executeIPCCommand } from '@libs/ledgerHardwareWallet/ledgerLiskAppIPCChannel/ledgerLiskAppClientIPCRequest/utils';
import { IPC_LEDGER_CHANNEL } from '@libs/ledgerHardwareWallet/constants';

const { NAME, TYPE } = IPC_LEDGER_CHANNEL;

// TODO: remove when server have a queuing system
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getSignedTransaction = async (devicePath, accountIndex, unsignedMessage) => {
  const signedTransaction = await executeIPCCommand(NAME, {
    channelType: TYPE.GET_SIGNED_TRANSACTION,
    devicePath,
    accountIndex,
    unsignedMessage,
  });

  return signedTransaction;
};

export const getPubKey = async (devicePath, accountIndex) => {
  await sleep(1600);
  const pubKey = await executeIPCCommand(NAME, {
    channelType: TYPE.GET_PUB_KEY,
    devicePath,
    accountIndex,
  });
  console.log('hwAccounts pubKey', pubKey);

  return pubKey;
};

export const getIsInsideLiskApp = async (devicePath, accountIndex) => {
  await sleep(1300);
  const isInsideLiskApp = await executeIPCCommand(NAME, {
    channelType: TYPE.GET_PUB_KEY,
    devicePath,
    accountIndex,
  });
  console.log('hwAccounts pubKey', isInsideLiskApp);

  return isInsideLiskApp;
};

export const getConnectedHWDevices = async () => {
  await sleep(1000);
  const signedTransaction = await executeIPCCommand(NAME, {
    channelType: TYPE.GET_CONNECTED_DEVICES,
  });
  return signedTransaction;
};
