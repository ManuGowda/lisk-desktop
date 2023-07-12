import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from 'src/theme/box';
import ValueAndLabel from 'src/modules/transaction/components/TransactionDetails/valueAndLabel';
import CopyToClipboard from 'src/modules/common/components/copyToClipboard';
import Skeleton from 'src/modules/common/components/skeleton/Skeleton';
import Icon from 'src/theme/Icon';
import loadingBackgroundImage from '../../../../../../setup/react/assets/images/loading-chain-background.png';
import loadingChainLogo from '../../../../../../setup/react/assets/images/loading-chain-logo.png';
import styles from './blockchainAppDetailsHeader.css';

const BlockchainAppDetailsHeader = ({ application, chainAction, loading }) => {
  const { t } = useTranslation();
  const { name, address, projectPage, icon, bg } = application.data;

  return (
    <header>
      {loading ? (
        <>
          <div className={styles.avatarContainer}>
            <img src={loadingChainLogo} className={styles.logo} />
            <img src={loadingBackgroundImage} className={styles.bg} />
          </div>

          <Box className={`${styles.detailsWrapper} ${styles.loadingDetailsWrapper}`}>
            <div className={styles.chainNameWrapper}>
              <Skeleton className={styles.skeleton} width="25%" />
            </div>
            <Box className={styles.addressRow}>
              <Skeleton className={styles.skeleton} width="50%" />
              <Skeleton className={styles.skeleton} width="25%" />
            </Box>
          </Box>
        </>
      ) : (
        <>
          <div className={styles.avatarContainer}>
            <img src={icon} className={styles.logo} />
            <img src={bg} className={styles.bg} />
          </div>
          <Box className={styles.detailsWrapper}>
            <div className={styles.chainNameWrapper}>
              <span className="chain-name-text">{name}</span>
              {chainAction}
            </div>
            {address && (
              <Box className={styles.addressRow}>
                <ValueAndLabel>
                  <span className="copy-address-wrapper">
                    <CopyToClipboard
                      text={address}
                      value={address}
                      className="tx-id"
                      containerProps={{
                        size: 'xs',
                        className: 'copy-address',
                      }}
                    />
                  </span>
                </ValueAndLabel>
              </Box>
            )}
            <div className={styles.addressRow}>
              <a
                rel="noopener noreferrer"
                className={`${styles.appLink}`}
                target="_blank"
                href={projectPage}
              >
                <Icon name="chainLinkIcon" className={styles.hwWalletIcon} />
                {t(projectPage)}
              </a>
            </div>
          </Box>
        </>
      )}
    </header>
  );
};

export default BlockchainAppDetailsHeader;
