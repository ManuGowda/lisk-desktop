/* eslint-disable max-lines */
import { to } from 'await-to-js';
import { createGenericTx } from '@transaction/api';
import { selectActiveTokenAccount } from '@common/store/selectors';
import transactionActionTypes from '@transaction/store/actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const delegateRegistered = (transactionObject) => async (dispatch, getState) => {
  const state = getState();
  const activeWallet = selectActiveTokenAccount(state);
  //
  // Create the transaction
  //
  const [error, tx] = await to(createGenericTx({
    network: state.network,
    wallet: activeWallet,
    transactionObject,
  }));

  //
  // Dispatch corresponding action
  //
  if (!error) {
    dispatch({
      type: transactionActionTypes.transactionCreatedSuccess,
      data: tx,
    });
  } else {
    dispatch({
      type: transactionActionTypes.transactionSignError,
      data: error,
    });
  }
};
