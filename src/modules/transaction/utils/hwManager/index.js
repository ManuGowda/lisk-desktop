import { transactions, cryptography, codec } from '@liskhq/lisk-client';
import { getSignedTransaction } from '@libs/hardwareWallet/ledger/ledgerLiskAppIPCChannel/clientLedgerHWCommunication';
import { signMessageByHW, updateTransactionSignatures } from 'src/modules/wallet/utils/hwManager';
import { joinModuleAndCommand } from '../moduleCommand';
import { MODULE_COMMANDS_NAME_MAP } from '../../configuration/moduleCommand';
import { MESSAGE_TAG_MULTISIG_REG } from '../transaction';

const createUnsignedMessage = (TAG, chainID, unsignedBytes) =>
  Buffer.concat([Buffer.from(TAG, 'utf8'), Buffer.from(chainID, 'hex'), unsignedBytes]).toString(
    'hex'
  );

const createUnsignedBytes = (transaction, options) => {
  const message = {
    mandatoryKeys: transaction.params.mandatoryKeys,
    optionalKeys: transaction.params.optionalKeys,
    numberOfSignatures: transaction.params.numberOfSignatures,
    address: cryptography.address.getAddressFromPublicKey(transaction.senderPublicKey),
    nonce: transaction.nonce,
  };
  const { messageSchema } = options;

  return codec.codec.encode(messageSchema, message);
};

const signMultiSignatureTransaction = async (wallet, schema, chainID, transaction) => {
  const unsignedBytes = transactions.getSigningBytes(transaction, schema);
  const unsignedMessage = createUnsignedMessage(
    transactions.TAG_TRANSACTION,
    chainID,
    unsignedBytes
  );

  const signedTransaction = await getSignedTransaction(
    wallet.hw.path,
    wallet.metadata.accountIndex,
    unsignedMessage
  );
  let signature = signedTransaction?.signature;

  if (signature instanceof Uint8Array) {
    signature = Buffer.from(signature);
  }

  return signature;
};

/**
 * signTransactionByHW - Function.
 * This function is used for sign a send hardware wallet transaction.
 */
// eslint-disable-next-line max-statements
const signTransactionByHW = async ({
  wallet,
  schema,
  chainID,
  transaction,
  senderAccount,
  options,
}) => {
  const isMultisigReg =
    joinModuleAndCommand(transaction) === MODULE_COMMANDS_NAME_MAP.registerMultisignature;
  const signerPublicKey = Buffer.from(wallet.metadata?.pubkey, 'hex');
  const isSender =
    Buffer.isBuffer(transaction.senderPublicKey) &&
    signerPublicKey.equals(transaction.senderPublicKey);

  let unsignedMessage;
  let signature;
  let isParamsSigning = false;

  if (isMultisigReg) {
    const isNonEmptySignatureExists =
      transaction.params.signatures.filter((sig) => sig.compare(Buffer.alloc(64)) === 0).length > 0;

    if (isNonEmptySignatureExists) {
      const unsignedBytes = createUnsignedBytes(transaction, options);
      unsignedMessage = createUnsignedMessage(MESSAGE_TAG_MULTISIG_REG, chainID, unsignedBytes);
      signature = await signMessageByHW({ account: wallet, message: unsignedMessage });
      isParamsSigning = true;
    }

    if (isSender && !isNonEmptySignatureExists) {
      signature = await signMultiSignatureTransaction(wallet, schema, chainID, transaction);
    }
  } else {
    signature = await signMultiSignatureTransaction(wallet, schema, chainID, transaction);
  }

  return updateTransactionSignatures(
    wallet,
    senderAccount,
    transaction,
    signature,
    isParamsSigning
  );
};

export { signTransactionByHW, createUnsignedMessage };
