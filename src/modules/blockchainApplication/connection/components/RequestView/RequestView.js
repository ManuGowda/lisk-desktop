import React from 'react';

import routes from 'src/routes/routes';
import MultiStep from 'src/modules/common/components/OldMultiStep';
import TxSignatureCollector from '@transaction/components/TxSignatureCollector';
import Dialog from 'src/theme/dialog/dialog';
import TransactionSummary from '@wallet/components/signWCSummary';
import Status from '@token/fungible/components/SendStatus';
import RequestSummary from '../RequestSummary';
import styles from './requestView.css';

const RequestView = ({ history }) => {
  // istanbul ignore next
  const backToWallet = () => {
    history.push(routes.wallet.path);
  };

  return (
    <Dialog hasClose className={styles.dialogWrapper}>
      <MultiStep key="RequestView" finalCallback={backToWallet} className={styles.wrapper}>
        <RequestSummary />
        <TransactionSummary />
        <TxSignatureCollector />
        <Status history={history} />
      </MultiStep>
    </Dialog>
  );
};

export default RequestView;
