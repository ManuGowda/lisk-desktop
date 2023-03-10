import { REQUEST, RESPONSE } from '@libs/ledgerHardwareWallet/constants';
import { to } from 'await-to-js';
import { ipcMain } from 'electron';

export const createIpcMainChannel = (channelName, callback) => {
  ipcMain.on(`${channelName}.${REQUEST}`, async (event, ...args) => {
    const [error, data] = await to(callback(...args));
    event.sender.send(`${channelName}.${RESPONSE}`, {
      success: !error,
      data,
      error: error?.toString(),
    });
  });
};
