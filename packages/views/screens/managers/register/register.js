import React, { useState, useEffect, useCallback } from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import routes from '@screens/router/routes';
import MultiStepProgressBar from '@shared/multiStepProgressBar';
import useCreateAccounts from '@wallet/utilities/hooks/useCreateAccounts';
import MultiStep from 'src/modules/common/components/MultiStep';
import ChooseAvatar from '../../../../../src/modules/auth/components/ChooseAvatar/chooseAvatar';
import BackupPassphrase from '../../../../../src/modules/auth/components/SavePassphrase /SavePassphrase';
import ConfirmPassphrase from '../../../../../src/modules/auth/components/ConfirmPassphrase/confirmPassphrase';
import AccountCreated from '../../../../../src/modules/auth/components/SignupSuccessed/accountCreated';
import styles from './register.css';

const Register = ({ account, token, history }) => {
  const [selectedAccount, setSelectedAccount] = useState({});
  const { suggestionAccounts } = useCreateAccounts();

  useEffect(() => {
    if (account?.info?.[token.active].address) {
      history.push(routes.dashboard.path);
    }
  }, [account, history, token]);

  const handleSelectAvatar = useCallback((userSelectedAccount) => {
    setSelectedAccount(userSelectedAccount);
  }, []);

  return (
    <div className={`${grid.row} ${styles.register}`}>
      <MultiStep
        navStyles={{ multiStepWrapper: styles.wrapper }}
        progressBar={MultiStepProgressBar}
      >
        <ChooseAvatar
          accounts={suggestionAccounts}
          selected={selectedAccount}
          handleSelectAvatar={handleSelectAvatar}
        />
        <BackupPassphrase account={selectedAccount} />
        <ConfirmPassphrase
          account={selectedAccount}
          passphrase={selectedAccount.passphrase}
        />
        <AccountCreated account={selectedAccount} />
      </MultiStep>
    </div>
  );
};

export default Register;
