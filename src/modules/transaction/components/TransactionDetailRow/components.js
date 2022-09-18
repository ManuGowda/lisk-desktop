import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { useTranslation } from 'react-i18next';
import Tooltip from 'src/theme/Tooltip';
import { useTheme } from 'src/theme/Theme';
import { TertiaryButton } from 'src/theme/buttons';
import WalletVisual from 'src/modules/wallet/components/walletVisual';
import { truncateAddress } from 'src/modules/wallet/utils/account';
import styles from './TransactionDetailRow.css';

export const Text = ({ value, isCapitalized }) => (
  <div className={`${styles.text} ${isCapitalized ? styles.capitlized : ''} ${grid['col-xs-7']}`}>
    <span>{value}</span>
  </div>
);

export const ExpandToggle = ({ isCollapsed, onToggle }) => (
  <TertiaryButton
    onClick={onToggle}
    className={`${styles.expandToggle} ${isCollapsed ? styles.collapsed : ''} ${grid['col-xs-5']}`}
  >
    <span>{isCollapsed ? 'Close' : 'Expand'}</span>
  </TertiaryButton>
);

export const Title = ({ tooltip, text }) => {
  const { t } = useTranslation();

  return (
    <div className={`${styles.title} ${grid['col-xs-5']}`}>
      <span>{text}</span>
      {tooltip && (
        <Tooltip position="right" size="s" indent>
          <p>{t(tooltip)}</p>
        </Tooltip>
      )}
    </div>
  );
};

export const AddressWithName = ({ address, name }) => (
  <div className={`${styles.addressWrapper}`}>
    <WalletVisual address={address} />
    <div>
      <p className={styles.name}>{name}</p>
      <p className={styles.address}>{truncateAddress(address)}</p>
    </div>
  </div>
);

export const TransactionStatus = ({ status }) => {
  const theme = useTheme();
  console.log('--', status);
  return (
    <div className={styles.statusWrapper}>
      <span className={`${styles.transactionStatus} ${styles[status]} ${styles[theme]}`}>
        {status}
      </span>
    </div>
  );
};
