import React from 'react';
import { useSelector } from 'react-redux';
import Box from 'src/theme/box';
import BoxContent from 'src/theme/box/content';
import TxBroadcaster from '@transaction/components/TxBroadcaster';
import { useCurrentAccount } from '@account/hooks';
import { statusMessages, getTransactionStatus } from '@transaction/configuration/statusConfig';
import useTxInitiatorAccount from '@transaction/hooks/useTxInitiatorAccount';
import { selectModuleCommandSchemas } from 'src/redux/selectors';

import ProgressBar from '../signMultisigView/progressBar';
import styles from './styles.css';
import { useMultiSignatureStatus } from '../../hooks/useMultiSignatureStatus';

// eslint-disable-next-line max-statements
const Status = ({ transactions, t, transactionJSON }) => {
  const [currentAccount] = useCurrentAccount();
  const moduleCommandSchemas = useSelector(selectModuleCommandSchemas);

  // This is to replace previous withData implementations.
  const { txInitiatorAccount } = useTxInitiatorAccount({
    senderPublicKey: transactionJSON.senderPublicKey,
  });
  const { mandatoryKeys, optionalKeys, numberOfSignatures, publicKey } = txInitiatorAccount;
  const isMultisignature =
    transactions.signedTransaction.params?.numberOfSignatures > 0 || numberOfSignatures > 0;

  const { canSenderSignTx } = useMultiSignatureStatus({
    transactionJSON,
    currentAccount,
    senderAccount: txInitiatorAccount,
    account: {
      mandatoryKeys,
      optionalKeys,
      numberOfSignatures,
      summary: {
        publicKey,
      },
    },
  });

  const status = getTransactionStatus(txInitiatorAccount, transactions, {
    moduleCommandSchemas,
    isMultisignature,
    canSenderSignTx,
  });

  const template = statusMessages(t)[status.code];
  return (
    <section>
      <Box className={styles.boxContainer}>
        <header>
          <h1>{t('Sign multisignature transaction')}</h1>
          <p>
            {t(
              'If you have received a multisignature transaction that requires your signature, use this tool to review and sign it.'
            )}
          </p>
        </header>
        <BoxContent>
          <ProgressBar current={4} />
          <TxBroadcaster
            message={template.message}
            title={template.title}
            illustration="signMultisignature"
            className={styles.content}
            status={status}
          />
        </BoxContent>
      </Box>
    </section>
  );
};

export default Status;
