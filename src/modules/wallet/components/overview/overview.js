/* eslint-disable max-statements */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import { useTokenBalances } from '@token/fungible/hooks/queries';
import TokenCard from '@wallet/components/TokenCard';
import TokenCarousel from '@wallet/components/TokenCarousel/TokenCarousel';
import { selectActiveTokenAccount } from 'src/redux/selectors';
import FlashMessageHolder from '@theme/flashMessage/holder';
import WarnPunishedValidator from '@pos/validator/components/WarnPunishedValidator';
import WalletVisualWithAddress from '@wallet/components/walletVisualWithAddress';
import DialogLink from 'src/theme/dialog/link';
import { useCurrentAccount } from '@account/hooks';
import { useLatestBlock } from '@block/hooks/queries/useLatestBlock';
import { SecondaryButton, PrimaryButton } from '@theme/buttons';
import { useValidators } from '@pos/validator/hooks/queries';
import { selectSearchParamValue } from 'src/utils/searchParams';
import { useAuth } from '@auth/hooks/queries';
import styles from './overview.css';

// @Todo: this should be remove as sdk would provide this data
// 6: blocks per minute, 60: minutes, 24: hours
const numOfBlockPerDay = 24 * 60 * 6;

const addWarningMessage = ({ isBanned, pomHeight, readMore }) => {
  FlashMessageHolder.addMessage(
    <WarnPunishedValidator isBanned={isBanned} pomHeight={pomHeight} readMore={readMore} />,
    'WarnPunishedValidator'
  );
};

const removeWarningMessage = () => {
  FlashMessageHolder.deleteMessage('WarnPunishedValidator');
};

const Overview = ({ isWalletRoute, history }) => {
  const searchAddress = selectSearchParamValue(history.location.search, 'address');
  const { t } = useTranslation();
  const [{ metadata: { address: currentAddress, name } = {} }] = useCurrentAccount();

  const address = useMemo(() => searchAddress || currentAddress, [searchAddress, currentAddress]);
  const { data: validators } = useValidators({ config: { params: { address } } });
  const { data: authData } = useAuth({ config: { params: { address } } });

  const validator = useMemo(() => validators?.data?.[0] || {}, [validators]);
  const {
    data: { height: currentHeight },
  } = useLatestBlock();

  const isBanned = validator.isBanned;
  const pomHeights = validator.punishmentPeriods;

  const daysLeft = Math.ceil((1000 - currentHeight) / numOfBlockPerDay);
  const wallet = useSelector(selectActiveTokenAccount);
  const { data: tokens, isLoading, error } = useTokenBalances({ config: { params: { address } } });
  const host = wallet.summary?.address ?? '';

  const showWarning = () => {
    if (
      !isWalletRoute &&
      host &&
      address &&
      (isBanned || pomHeights?.length) &&
      (isBanned || daysLeft >= 1)
    ) {
      addWarningMessage({
        isBanned,
        pomHeight: pomHeights ? pomHeights[pomHeights.length - 1] : 0,
        readMore: () => {
          const url = 'https://lisk.com/blog/development/lisk-staking-process';
          window.open(url, 'rel="noopener noreferrer"');
        },
      });
    } else {
      removeWarningMessage();
    }
  };

  const renderTokenCard = useCallback((token) => <TokenCard token={token} />, []);

  useEffect(() => {
    const params = history?.location.search;
    if (params === '') removeWarningMessage();
  }, []);

  useEffect(showWarning, [isWalletRoute, host, address, pomHeights]);

  return (
    <section className={`${grid.row} ${styles.wrapper}`}>
      <div className={`${grid['col-xs-6']} ${grid['col-md-6']} ${grid['col-lg-6']}`}>
        <WalletVisualWithAddress
          copy
          size={50}
          address={authData?.meta?.address}
          accountName={authData?.meta?.name || name}
          detailsClassName={styles.accountSummary}
          truncate={false}
          isMultisig={authData?.data?.numberOfSignatures > 0}
          publicKey={authData?.meta?.publicKey}
        />
      </div>
      <div className={`${grid['col-xs-6']} ${grid['col-md-6']} ${grid['col-lg-6']}`}>
        <div className={`${grid.row} ${styles.actionButtons}`}>
          <div className={`${grid['col-xs-3']} ${grid['col-md-3']} ${grid['col-lg-3']}`}>
            <DialogLink component="request">
              <SecondaryButton>{t('Request')}</SecondaryButton>
            </DialogLink>
          </div>
          <div className={`${grid['col-xs-3']} ${grid['col-md-3']} ${grid['col-lg-3']}`}>
            <DialogLink component="send">
              <PrimaryButton>{t('Send')}</PrimaryButton>
            </DialogLink>
          </div>
        </div>
      </div>
      <div className={styles.tokenCarouselWrapper}>
        <div className={styles.contentWrapper}>
          <div className={`${styles.carouselHeader}`}>
            <div>{t('Tokens')}</div>
            <div>
              <Link to="/wallet/tokens/all">{t('View all tokens')}</Link>
            </div>
          </div>
          <TokenCarousel
            data={tokens?.data ?? []}
            error={error}
            isLoading={isLoading}
            renderItem={renderTokenCard}
          />
        </div>
      </div>
    </section>
  );
};

export default Overview;
