// eslint-disable-next-line import/no-unresolved
import i18next from 'i18next';
import { getSignedMessage } from '@libs/hardwareWallet/ledger/ledgerLiskAppIPCChannel/clientLedgerHWCommunication';
import { MODULE_COMMANDS_NAME_MAP } from 'src/modules/transaction/configuration/moduleCommand';
import {
  getMembersAndSenderIndex,
  joinModuleAndCommand,
  updateMultiSigRegSignatures,
} from 'src/modules/transaction/utils';

/**
 * updateTransactionSignatures - Function.
 * This function updates transaction object to include the signatures at correct index.
 * The below logic is copied from Lisk SDK https://github.com/LiskHQ/lisk-sdk/blob/2593d1fe70154a9209b713994a252c494cad7123/elements/lisk-transactions/src/sign.ts#L228-L297
 */
/* eslint-disable max-statements, complexity */
const updateTransactionSignatures = (
  wallet,
  senderAccount,
  transaction,
  signature,
  isParamsSigning,
  options
) => {
  const isMultisigReg =
    joinModuleAndCommand(transaction) === MODULE_COMMANDS_NAME_MAP.registerMultisignature;
  const signerPublicKey = Buffer.from(wallet.metadata.pubkey, 'hex');
  const isSender =
    Buffer.isBuffer(transaction.senderPublicKey) &&
    signerPublicKey.equals(transaction.senderPublicKey);
  const { mandatoryKeys, optionalKeys } = senderAccount;
  const isAccountMultisignature = mandatoryKeys.length + optionalKeys.length > 0;
  const currentAccountPubKey = Buffer.from(wallet.metadata.pubkey, 'hex');

  // Add signature when signing from a regular account
  if (!isAccountMultisignature && !isParamsSigning) {
    transaction.signatures[0] = signature;

    return transaction;
  }

  // Add params signature when registering multisignature account
  if (!isAccountMultisignature || (isSender && isMultisigReg && isParamsSigning)) {
    const { senderIndex, members } = getMembersAndSenderIndex(transaction, currentAccountPubKey);
    if (senderIndex >= 0) {
      updateMultiSigRegSignatures(transaction, members, senderIndex, signature);
    }

    return transaction;
  }

  // Add signature when signing from multisig accounts
  const keys = {
    mandatoryKeys: options.txInitiatorAccount.mandatoryKeys.map((k) => Buffer.from(k, 'hex')),
    optionalKeys: options.txInitiatorAccount.optionalKeys.map((k) => Buffer.from(k, 'hex')),
  };
  keys.mandatoryKeys.sort((publicKeyA, publicKeyB) => publicKeyA.compare(publicKeyB));
  keys.optionalKeys.sort((publicKeyA, publicKeyB) => publicKeyA.compare(publicKeyB));
  const accountKeys = keys.mandatoryKeys.concat(keys.optionalKeys);
  for (let i = 0; i < accountKeys.length; i += 1) {
    if (accountKeys[i].equals(signerPublicKey)) {
      transaction.signatures[i] = signature;
    } else if (transaction.signatures[i] === undefined) {
      transaction.signatures[i] = Buffer.alloc(0);
    }
  }

  return transaction;
};
/* eslint-disable max-statements */

const signMessageByHW = async ({ account, message }) => {
  try {
    const signedMessage = await getSignedMessage(
      account.hw.path,
      account.metadata.accountIndex,
      message
    );
    let signature = signedMessage?.signature;

    if (!signature) {
      throw new Error(
        i18next.t('The message signature has been canceled on your {{model}}', {
          model: account.hw.product,
        })
      );
    }

    if (signature instanceof Uint8Array) {
      signature = Buffer.from(signature);
    }

    return signature;
  } catch (error) {
    throw new Error(
      i18next.t('The message signature has been canceled on your {{model}}', {
        model: account.hw.product,
      })
    );
  }
};

export { updateTransactionSignatures, signMessageByHW };
