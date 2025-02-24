import React from 'react';
import { withTranslation } from 'react-i18next';
import { convertFromBaseDenom } from '@token/fungible/utils/helpers';
import Box from 'src/theme/box';
import BoxContent from 'src/theme/box/content';
import TokenAmount from '@token/fungible/components/tokenAmount';
import DiscreetMode from 'src/modules/common/components/discreetMode';
import Converter from 'src/modules/common/components/converter';
import LockedBalanceLink from './LockedBalanceLink';
import ActionBar from './ActionBar';
import styles from './BalanceInfo.css';

// eslint-disable-next-line complexity
// @Todo: this component needs to be removed cleanly because it seems it not used in the application
const BalanceInfo = ({ t, activeToken, isWalletRoute, account }) => {
  const { address, balance = 0 } = account?.summary ?? {};

  const isBanned = account?.pos?.validator?.isBanned;
  const pomHeights = account?.pos?.validator?.punishmentPeriods;
  const pomStart = pomHeights?.length ? pomHeights[pomHeights.length - 1] : {};

  return (
    <Box className={`${styles.wrapper}`}>
      <BoxContent className={styles.content}>
        <h2 className={styles.title}>{t('Balance')}</h2>
        <div className={styles.valuesRow}>
          <DiscreetMode shouldEvaluateForOtherAccounts>
            <div className={`${styles.cryptoValue} balance-value`}>
              <TokenAmount val={balance} token={activeToken} />
              <Converter
                className={styles.fiatValue}
                value={convertFromBaseDenom(balance, activeToken)}
                tokenSymbol={activeToken.symbol}
                error=""
              />
            </div>
            <LockedBalanceLink
              activeToken={activeToken}
              isWalletRoute={isWalletRoute}
              account={account}
            />
          </DiscreetMode>
        </div>
        <ActionBar
          address={address}
          username={account?.pos?.validator?.username}
          isWalletRoute={isWalletRoute}
          activeToken={activeToken}
          isBanned={isBanned}
          pomStart={pomStart}
        />
      </BoxContent>
    </Box>
  );
};

export default withTranslation()(BalanceInfo);
