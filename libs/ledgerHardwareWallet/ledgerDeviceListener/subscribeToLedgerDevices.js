import { LEDGER_HW_DEVICE_EVENT } from '@libs/ledgerHardwareWallet/constants';

const IPC = window.ipc;

export const subscribeToLedgerDeviceEvents = (fn) => {
  IPC.on(LEDGER_HW_DEVICE_EVENT, (action, data) => fn(data));
};
