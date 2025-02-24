import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useCurrentAccount } from '@account/hooks';
import { useDispatch } from 'react-redux';
import { signMessage } from '@message/store/action';
import CopyToClipboard from '@common/components/copyToClipboard';
import { PrimaryButton } from '@theme/buttons';
import styles from './RequestSignMessageConfirmation.css';

export function RequestSignMessageConfirmation({ nextStep, address, message }) {
  const { t } = useTranslation();
  const [currentAccount] = useCurrentAccount();
  const dispatch = useDispatch();

  /* istanbul ignore next */
  const onClick = () => {
    nextStep({
      message,
      actionFunction: (formProps, _, privateKey) =>
        dispatch(signMessage({ message, nextStep, privateKey, currentAccount })),
    });
  };

  return (
    <div className={styles.RequestSignMessageConfirmation}>
      <p className={styles.description}>
        {t('This request was initiated from another application.')}
      </p>
      <div className={styles.content}>
        <p className={styles.label}>{t('Sender account: ')}</p>
        <CopyToClipboard
          text={address}
          value={address}
          className={classNames('tx-id', styles.copyToClipboardProp)}
          containerProps={{
            size: 'xs',
            className: 'copy-address',
          }}
        />
        <p className={styles.label}>{t('Message')}</p>
        <div className={styles.messageBox}>{message}</div>
        <PrimaryButton className={styles.btnContinue} onClick={onClick}>
          {t('Continue')}
        </PrimaryButton>
      </div>
    </div>
  );
}
