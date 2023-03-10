import { IPC_MESSAGES } from '@libs/hwServer/constants';

const { DEVICE_UPDATE } = IPC_MESSAGES;

const actionTypes = {
  setHWAccounts: 'HW_ACCOUNTS_ADD',
  removeHWAccounts: 'HW_ACCOUNTS_REMOVE',
  setCurrentDevice: `HW_${DEVICE_UPDATE}`,
  setHWDevices: `HW_SET_DEVICES`,
  addHWDevice: `HW_ADD_DEVICE`,
  removeHWDevice: `HW_REMOVE_DEVICE`,
};

export default actionTypes;
