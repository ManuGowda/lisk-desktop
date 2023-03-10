import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentHWDevice,
  selectHWAccounts,
} from '@hardwareWallet/store/selectors/hwSelectors';
import { getPubKey } from '@libs/ledgerHardwareWallet/ledgerLiskAppIPCChannel/ledgerLiskAppClientIPCRequest';
import { setHWAccounts } from '@hardwareWallet/store/actions';
import { extractAddressFromPublicKey } from '@wallet/utils/account';
import { selectSettings } from 'src/redux/selectors';
import { getNameFromAccount } from '@hardwareWallet/utils/getNameFromAccount';

const useHWAccounts = () => {
  const hwAccounts = useSelector(selectHWAccounts);
  const currentHWDevice = useSelector(selectCurrentHWDevice);
  const settings = useSelector(selectSettings);
  const getAccountName = (address, model) => getNameFromAccount(address, settings, model);

  const dispatch = useDispatch();
  const { ipc } = window;

  useEffect(() => {
    if (ipc && dispatch && currentHWDevice?.path) {
      (async () => {
        console.log('hwAccounts fetching pubKeys...');
        const accountIndex = 0;
        const pubKey = await getPubKey(currentHWDevice?.path, accountIndex);
        console.log('hwAccounts fetching pubKey...', pubKey);
        const address = extractAddressFromPublicKey(pubKey);
        console.log('hwAccounts fetching address...', address);

        const account = {
          hw: currentHWDevice,
          metadata: {
            address,
            pubkey: pubKey,
            accountIndex,
            name: getAccountName(address, currentHWDevice.product),
            path: currentHWDevice.path,
            isHW: true,
            isNew: false,
          },
        };
        console.log('account', account);
        dispatch(setHWAccounts([account]));
        // const pubKey = await getPubKey(currentHWDevicePath, 0);
        // console.log('pubKey', pubKey);
      })();
    }
  }, [ipc, dispatch, currentHWDevice]);

  return { accounts: hwAccounts };
};

export default useHWAccounts;
