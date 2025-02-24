import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Dialog from '@theme/dialog/dialog';
import Box from 'src/theme/box';
import TokenAmount from '@token/fungible/components/tokenAmount';
import ValueAndLabel from '@transaction/components/TransactionDetails/valueAndLabel';
import { PrimaryButton, TertiaryButton } from 'src/theme/buttons';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import Icon from 'src/theme/Icon';
import Tooltip from 'src/theme/Tooltip';
import { parseSearchParams, removeThenAppendSearchParamsToUrl } from 'src/utils/searchParams';
import { useApplicationManagement } from '@blockchainApplication/manage/hooks';
import { usePinBlockchainApplication } from '@blockchainApplication/manage/hooks/usePinBlockchainApplication';
import { getLogo } from '@token/fungible/utils/helpers';
import Illustration from 'src/modules/common/components/illustration';
import Skeleton from 'src/modules/common/components/skeleton/Skeleton';
import styles from './BlockchainApplicationDetails.css';
import { useBlockchainApplicationExplore } from '../../hooks/queries/useBlockchainApplicationExplore';
import { useBlockchainApplicationMeta } from '../../../manage/hooks/queries/useBlockchainApplicationMeta';
import defaultBackgroundImage from '../../../../../../setup/react/assets/images/default-chain-background.png';
import BlockchainAppDetailsHeader from '../BlockchainAppDetailsHeader';

// eslint-disable-next-line max-statements, complexity
const BlockchainApplicationDetails = ({ history, location }) => {
  const { t } = useTranslation();
  const chainId = parseSearchParams(location.search).chainId;
  const mode = parseSearchParams(location.search).mode;

  const {
    data: onChainData,
    refetch: refetchOnChainData,
    isLoading: onChainLoading,
    isError: isOnChainDataError,
  } = useBlockchainApplicationExplore({
    config: { params: { chainID: chainId } },
  });
  const {
    data: offChainData,
    refetch: refetchOffChainData,
    isLoading: offChainLoading,
    isError: isOffChainDataError,
  } = useBlockchainApplicationMeta({
    config: { params: { chainID: chainId } },
  });
  const aggregatedApplicationData = { ...onChainData?.data[0], ...offChainData?.data[0] };
  const { checkPinByChainId, togglePin } = usePinBlockchainApplication();
  const {
    status,
    lastCertificateHeight,
    lastUpdated,
    logo,
    depositedLsk = 0,
  } = aggregatedApplicationData;
  const { setApplication } = useApplicationManagement();

  const isPinned = checkPinByChainId(chainId);
  const toggleApplicationPin = () => {
    togglePin(chainId);
  };
  const addNewApplication = () => {
    setApplication(aggregatedApplicationData);
    removeThenAppendSearchParamsToUrl(
      history,
      { modal: 'addApplicationSuccess', chainId: aggregatedApplicationData.chainID },
      ['modal', 'chainId', 'mode']
    );
  };

  const reloadAppDetails = () => {
    refetchOnChainData();
    refetchOffChainData();
  };

  const footerDetails = [
    {
      header: {
        text: t('Chain ID'),
        toolTipText: t('The chain ID uniquely identifies a chain in the Lisk ecosystem'),
      },
      className: `${styles.detailContentText} chain-id`,
      content: chainId,
    },
    {
      header: t('Status'),
      className: `${styles.detailContentText} ${styles.statusChip} ${styles[status]} chain-status`,
      content: t(status),
    },
    {
      header: t('Last Update'),
      className: `${styles.detailContentText} last-update`,
      content: moment(lastUpdated * 1000).format('DD MMM YYYY'),
    },
    {
      header: t('Last Certificate Height'),
      className: `${styles.detailContentText} last-certificate-height`,
      content: lastCertificateHeight,
    },
  ];

  const application = {
    data: {
      ...aggregatedApplicationData,
      icon: getLogo({ logo }),
      bg: defaultBackgroundImage,
      name: aggregatedApplicationData.chainName,
    },
  };

  if (isOnChainDataError || isOffChainDataError)
    return (
      <Dialog hasClose className={`${grid.row} ${grid['center-xs']}`}>
        <div className={`${styles.wrapper} ${styles.errorWrapper}`}>
          <Illustration name="applicationDetailsError" />
          <div className={styles.errorText}>{t('Error loading application data')}</div>
          <div className={styles.retryBtn}>
            <TertiaryButton onClick={reloadAppDetails}>{t('Try again')}</TertiaryButton>
          </div>
        </div>
      </Dialog>
    );

  return (
    <Dialog
      hasClose
      hasBack
      className={`${styles.dialogWrapper} ${grid.row} ${grid['center-xs']}`}
      customBackBtn="arrowLeftTailedDark"
    >
      <div className={styles.wrapper}>
        <BlockchainAppDetailsHeader
          classNameBackgroundColor={styles.classNameBackgroundColorProp}
          application={application}
          chainAction={
            <TertiaryButton className="chain-details-pin-button" onClick={toggleApplicationPin}>
              <Icon data-testid="pin-button" name={isPinned ? 'pinnedIcon' : 'unpinnedIcon'} />
            </TertiaryButton>
          }
          loading={onChainLoading || offChainLoading}
          clipboardCopyItems={[{ value: aggregatedApplicationData.address }]}
        />
        <div className={styles.balanceRow}>
          {onChainLoading || offChainLoading ? (
            <Skeleton className={styles.skeleton} width="25%" />
          ) : (
            <ValueAndLabel label={t('Deposited:')} direction="horizontal">
              <span className={styles.value}>
                <TokenAmount val={depositedLsk} isLsk />
              </span>
            </ValueAndLabel>
          )}
        </div>
        <Box className={styles.footerDetailsRow}>
          {onChainLoading || offChainLoading
            ? footerDetails.map((_, idx) => (
                <div className={styles.skeletonWrapper} key={idx}>
                  <Skeleton className={styles.skeleton} width="50%" />
                  <Skeleton className={styles.skeleton} width="50%" />
                </div>
              ))
            : footerDetails.map(({ header, content, className }, index) => (
                <ValueAndLabel
                  key={index}
                  className={styles.detail}
                  label={
                    <span className={styles.headerText}>
                      <>
                        {header.text || header}
                        {header.toolTipText && (
                          <Tooltip position="right">
                            <p>{header.toolTipText}</p>
                          </Tooltip>
                        )}
                      </>
                    </span>
                  }
                >
                  <span className={className}>{content}</span>
                </ValueAndLabel>
              ))}
        </Box>
        {mode === 'addApplication' ? (
          <Box className={styles.footerButton}>
            <PrimaryButton
              size="l"
              className={`${styles.addButton} add-application-button`}
              data-testid="add-application-button"
              onClick={addNewApplication}
            >
              {t('Add application')}
            </PrimaryButton>
          </Box>
        ) : null}
      </div>
    </Dialog>
  );
};

export default BlockchainApplicationDetails;
