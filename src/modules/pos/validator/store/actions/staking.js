import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import to from 'await-to-js';
import { selectActiveTokenAccount } from 'src/redux/selectors';
import { signTransaction } from '@transaction/api';
import txActionTypes from '@transaction/store/actionTypes';
import { joinModuleAndCommand } from '@transaction/utils';
import { selectCurrentApplicationChainID } from '@blockchainApplication/manage/store/selectors';
import actionTypes from './actionTypes';
import { useSentStakes } from '../../hooks/queries';

export const stakesReset = () => ({
  type: actionTypes.stakesReset,
});

/**
 * Clears the existing changes on stakes.
 * The stake queue will be empty after this action dispatched
 *
 * @returns {Object} Pure action object
 */
export const stakesCleared = () => ({
  type: actionTypes.stakesCleared,
});

/**
 * To be dispatched when the pending stake transaction
 * is confirmed by the blockchain.
 *
 * @returns {Object} Pure action object
 */
export const stakesConfirmed = () => ({
  type: actionTypes.stakesConfirmed,
});

/**
 * To be dispatched when a stake is to be removed from the staking queue
 *
 * @returns {Object} Pure action object
 */
export const stakeDiscarded = (data) => ({
  type: actionTypes.stakeDiscarded,
  data,
});

/**
 * Defines the new stake amount for a given validator.
 * The reducer will add a new stake if it didn't exist before
 * Any stake whose stake amount changes to zero will be removed
 * when the stake transaction is confirmed (via stakesConfirmed action)
 */
export const stakeEdited = (data) => async (dispatch) =>
  dispatch({
    type: actionTypes.stakeEdited,
    data,
  });

/**
 * Makes Api call to register stakes
 * Adds pending state and then after the duration of one round
 * cleans the pending state
 */
export const stakesSubmitted =
  (_, transactionJSON, privateKey, __, senderAccount, moduleCommandSchemas) =>
  async (dispatch, getState) => {
    const state = getState();
    const wallet = state.account?.current?.hw
      ? state.account.current
      : selectActiveTokenAccount(state);

    const [error, tx] = await to(
      signTransaction({
        transactionJSON,
        wallet,
        schema: moduleCommandSchemas[joinModuleAndCommand(transactionJSON)],
        chainID: selectCurrentApplicationChainID(state),
        privateKey,
        senderAccount,
      })
    );
    if (error) {
      dispatch({
        type: txActionTypes.transactionSignError,
        data: error,
      });
    } else {
      dispatch({ type: actionTypes.stakesSubmitted });
      dispatch({
        type: txActionTypes.transactionCreatedSuccess,
        data: tx,
      });
    }
  };

export const useStakesRetrieved = (address) => {
  const dispatch = useDispatch();
  const { data: sentStakes, isSuccess: isSentStakesSuccess } = useSentStakes({
    config: { params: { address } },
  });

  useEffect(() => {
    if (!isSentStakesSuccess) {
      dispatch({
        type: actionTypes.stakesRetrieved,
        data: {
          account: {},
        },
      });
      return;
    }
    dispatch({
      type: actionTypes.stakesRetrieved,
      data: sentStakes.data,
    });
  }, [sentStakes, isSentStakesSuccess]);
};

const signAndDispatchTransaction = async (
  dispatch,
  getState,
  formProps,
  transactionJSON,
  privateKey,
  senderAccount
) => {
  const state = getState();
  const wallet = state.account?.current?.hw
    ? state.account.current
    : selectActiveTokenAccount(state);

  const [error, tx] = await to(
    signTransaction({
      transactionJSON,
      wallet,
      schema: state.network.networks.LSK.moduleCommandSchemas[formProps.moduleCommand],
      chainID: selectCurrentApplicationChainID(state),
      privateKey,
      senderAccount,
    })
  );

  if (!error) {
    dispatch({
      type: txActionTypes.transactionCreatedSuccess,
      data: tx,
    });
  } else {
    dispatch({
      type: txActionTypes.transactionSignError,
      data: error,
    });
  }
};

export const balanceUnlocked =
  (formProps, transactionJSON, privateKey, senderAccount) => async (dispatch, getState) => {
    await signAndDispatchTransaction(
      dispatch,
      getState,
      formProps,
      transactionJSON,
      privateKey,
      senderAccount
    );
  };

export const claimedRewards =
  (formProps, transactionJSON, privateKey, senderAccount) => async (dispatch, getState) => {
    await signAndDispatchTransaction(
      dispatch,
      getState,
      formProps,
      transactionJSON,
      privateKey,
      senderAccount
    );
  };
