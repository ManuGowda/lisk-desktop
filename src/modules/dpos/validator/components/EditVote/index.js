/* eslint-disable complexity */
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  selectSearchParamValue,
  removeSearchParamsFromUrl,
  removeThenAppendSearchParamsToUrl,
} from 'src/utils/searchParams';
import { useCurrentAccount } from 'src/modules/account/hooks';
import { toRawLsk } from '@token/fungible/utils/lsk';
import { useTokensBalance } from 'src/modules/token/fungible/hooks/queries';
import Dialog from 'src/theme/dialog/dialog';
import Box from 'src/theme/box';
import BoxContent from 'src/theme/box/content';
import BoxFooter from 'src/theme/box/footer';
import BoxHeader from 'src/theme/box/header';
import BoxInfoText from 'src/theme/box/infoText';
import AmountField from 'src/modules/common/components/amountField';
import WalletVisual from 'src/modules/wallet/components/walletVisual';
import TokenAmount from '@token/fungible/components/tokenAmount';
import WarnPunishedDelegate from '@dpos/validator/components/WarnPunishedDelegate';
import { useBlocks } from 'src/modules/block/hooks/queries/useBlocks';
import { useAuth } from 'src/modules/auth/hooks/queries';
import { PrimaryButton, SecondaryButton, WarningButton } from 'src/theme/buttons';
import useVoteAmountField from '../../hooks/useVoteAmountField';
import getMaxAmount from '../../utils/getMaxAmount';
import styles from './editVote.css';
import { useDelegates, useSentVotes } from '../../hooks/queries';
import { NUMBER_OF_BLOCKS_PER_DAY } from '../../consts';

const getTitles = (t) => ({
  edit: {
    title: t('Edit vote'),
    description: t(
      'Increase or decrease your vote amount, or remove your vote from this delegate. Your updated vote will be added to the voting queue.'
    ),
  },
  add: {
    title: t('Add to voting queue'),
    description: t(
      'Input your vote amount. This value shows how much trust you have in this delegate. '
    ),
  },
});

// @Todo this is just a place holder pending when service confirms where this can be gotten from.
const dposTokenId = '0'.repeat(16);

// eslint-disable-next-line max-statements
const EditVote = ({ history, voteEdited, network, voting }) => {
  const { t } = useTranslation();
  const [
    {
      metadata: { address: currentAddress },
    },
  ] = useCurrentAccount();
  const [maxAmount, setMaxAmount] = useState(0);
  const [isForm, setIsForm] = useState(true);

  const [address] = selectSearchParamValue(history.location.search, ['address']);
  const delegateAddress = address || currentAddress;

  const { data: delegates, isLoading: isLoadingDelegates } = useDelegates({
    config: { params: { address: delegateAddress } },
  });

  const delegate = useMemo(() => delegates?.data?.[0] || {}, [isLoadingDelegates]);
  const delegatePomHeight = useMemo(() => delegate.pomHeights?.[0] || {}, [delegate]);

  const { data: blocks } = useBlocks({ config: { params: { limit: 1 } } });
  const currentHeight = useMemo(() => blocks?.data?.[0]?.height, [blocks]);

  const { data: sentVotes } = useSentVotes({
    config: { params: { address: currentAddress } },
  });

  const { data: tokens } = useTokensBalance({ config: { params: { tokenID: dposTokenId } } });
  const token = useMemo(() => tokens?.data?.[0] || {}, [tokens]);

  const { data: authData } = useAuth({ config: { params: { address: delegateAddress } } });
  const auth = useMemo(() => ({ ...authData?.data, ...authData?.meta }), [authData]);
  const { nonce, publicKey, numberOfSignatures, optionalKeys = [], mandatoryKeys = [] } = auth;

  const [start = delegatePomHeight.start, end = delegatePomHeight.end] = selectSearchParamValue(
    history.location.search,
    ['start', 'end']
  );

  const hasSentVoteToDelegate = useMemo(() => {
    const votes = sentVotes?.data?.votes;
    if (!votes) return false;

    return votes.some(({ delegateAddress: dAddress }) => dAddress === delegateAddress);
  }, [sentVotes]);

  const [voteAmount, setVoteAmount] = useVoteAmountField(0);
  const mode = hasSentVoteToDelegate ? 'edit' : 'add';
  const titles = getTitles(t)[mode];

  useEffect(() => {
    getMaxAmount({
      balance: token.availableBalance,
      nonce,
      publicKey,
      voting,
      address,
      network,
      numberOfSignatures,
      mandatoryKeys,
      optionalKeys,
    }).then(setMaxAmount);
  }, [token, auth, network, voting]);

  const handleConfirm = () => {
    if (!isForm) {
      removeThenAppendSearchParamsToUrl(history, { modal: 'votingQueue' }, ['modal']);
      return;
    }
    voteEdited([
      {
        address: delegate.address,
        amount: toRawLsk(voteAmount.value),
        name: delegate.name,
      },
    ]);

    if (mode === 'add') setIsForm(false);
    if (mode === 'edit') {
      removeThenAppendSearchParamsToUrl(history, { modal: 'votingQueue' }, ['modal']);
    }
  };

  const handleContinueVoting = () => {
    setVoteAmount(0);
    setIsForm(true);
  };

  const removeVote = () => {
    voteEdited([
      {
        name: delegate.name,
        address: delegate.address,
        amount: 0,
      },
    ]);
    removeSearchParamsFromUrl(history, ['modal']);
  };

  const daysLeft = Math.ceil((parseInt(end, 10) - currentHeight) / NUMBER_OF_BLOCKS_PER_DAY);
  const subTitles = {
    edit: t('After changing your vote amount, it will be added to the voting queue.'),
    add: titles.description,
  };
  const headerTitles = {
    edit: t('Edit Vote'),
    add: titles.title,
  };

  return (
    <Dialog
      hasClose
      className={`${styles.wrapper} ${!isForm || mode === 'edit' ? styles.confirmWrapper : ''}`}
    >
      <Box>
        <BoxHeader>
          <h1>{!isForm ? t('Vote added') : headerTitles[mode]}</h1>
        </BoxHeader>
        <BoxContent className={styles.noPadding}>
          <BoxInfoText>
            <span>
              {!isForm ? t('Your vote has been added to your voting queue') : subTitles[mode]}
            </span>
          </BoxInfoText>
          {(isForm || mode === 'edit') && (
            <>
              {mode === 'add' && (
                <BoxInfoText className={styles.accountInfo}>
                  <WalletVisual size={40} address={delegate.address} />
                  <p>{delegate.name}</p>
                  <p>{delegate.address}</p>
                </BoxInfoText>
              )}
              <label className={styles.fieldGroup}>
                {mode === 'add' && (
                  <p className={styles.availableBalance}>
                    <span>{t('Available Bal: ')}</span>
                    <span>
                      <TokenAmount token={token.symbol} val={token.availableBalance} />
                    </span>
                  </p>
                )}
                <AmountField
                  amount={voteAmount}
                  onChange={setVoteAmount}
                  maxAmount={{ value: maxAmount }}
                  displayConverter
                  label={t('Vote amount ({{symbol}})', { symbol: token.symbol })}
                  labelClassname={`${styles.fieldLabel}`}
                  placeholder={t('Insert vote amount')}
                  name="vote"
                />
              </label>
              {daysLeft >= 1 && start !== undefined && (
                <>
                  <WarnPunishedDelegate pomHeight={{ start, end }} vote />
                  <span className={styles.space} />
                </>
              )}
            </>
          )}
        </BoxContent>
        <BoxFooter direction={mode === 'edit' ? 'horizontal' : 'vertical'}>
          {mode === 'edit' && (
            <WarningButton className="remove-vote" onClick={removeVote}>
              {t('Remove vote')}
            </WarningButton>
          )}
          {!isForm && (
            <SecondaryButton
              className={`${styles.confirmButton}`}
              onClick={handleContinueVoting}
              disabled={voteAmount.error}
            >
              {t('Continue voting')}
            </SecondaryButton>
          )}
          <PrimaryButton
            className={`${styles.confirmButton} confirm`}
            onClick={handleConfirm}
            disabled={voteAmount.error}
          >
            {t(isForm ? 'Confirm' : 'Go to the voting queue')}
          </PrimaryButton>
        </BoxFooter>
      </Box>
    </Dialog>
  );
};

export default EditVote;
