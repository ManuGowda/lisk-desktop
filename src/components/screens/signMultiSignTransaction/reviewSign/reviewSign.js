import React from 'react';
import Box from '../../../toolbox/box';
import BoxContent from '../../../toolbox/box/content';
import BoxFooter from '../../../toolbox/box/footer';
import { PrimaryButton, SecondaryButton } from '../../../toolbox/buttons';
import ProgressBar from '../progressBar';

const ReviewSign = ({ t, prevStep, nextStep }) => {
  const submitTransaction = () => {
    const [error, tx] = [false, { id: 1 }];

    if (!error) {
      nextStep({ transactionInfo: tx });
    } else {
      nextStep({ error });
    }
  };

  return (
    <section>
      <Box>
        <header>
          <h1>{t('Sign multisignature transaction')}</h1>
          <p>{t('If you have received a multisignature transaction that requires your signature, use this tool to review and sign it.')}</p>
        </header>
        <BoxContent>
          <ProgressBar current={2} />
          {'// TODO'}
        </BoxContent>
        <BoxFooter>
          <SecondaryButton className="go-back" onClick={prevStep}>{t('Edit')}</SecondaryButton>
          <PrimaryButton className="confirm" size="l" onClick={submitTransaction}>
            {t('Sign')}
          </PrimaryButton>
        </BoxFooter>
      </Box>
    </section>
  );
};

export default ReviewSign;
