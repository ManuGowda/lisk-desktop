import React from 'react';
import { extractAddressFromPublicKey } from '@wallet/utils/account';
import MultiSignatureReview from '../MultiSignatureReview';

const RegisterMultisignatureGroup = ({ t, transactionJSON }) => {
  const mandatory = transactionJSON.params.mandatoryKeys.map((item) => ({
    address: extractAddressFromPublicKey(item),
    publicKey: item,
    isMandatory: true,
  }));
  const optional = transactionJSON.params.optionalKeys.map((item) => ({
    address: extractAddressFromPublicKey(item),
    publicKey: item,
    isMandatory: false,
  }));
  return (
    <MultiSignatureReview
      t={t}
      fee={transactionJSON.fee}
      members={[...mandatory, ...optional]}
      numberOfSignatures={transactionJSON.params.numberOfSignatures}
    />
  );
};

export default RegisterMultisignatureGroup;
