/* eslint-disable no-use-before-define */
import actionTypes from '@hardwareWallet/store/actions/actionTypes';

export const initialState = [];

/**
 *
 * @param {Array} state
 * @param {Object} action
 */
export const devices = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.setHWDevices: {
      console.log('1111 payload', payload);
      return payload;
    }
    case actionTypes.addHWDevice: {
      return imPush(state, payload);
    }
    case actionTypes.removeHWDevice: {
      return imDeleteFromArrayById(state, 'path', payload.path);
    }
    default:
      return state;
  }
};

export function imPush(arr, newEntry) {
  const safeSpread = arr || [];
  return [...safeSpread, newEntry];
}
export function imArrayMerge(first = [], second = []) {
  const safeSpreadFirst = first || [];
  const safeSpreadSecond = second || [];
  return [...safeSpreadFirst, ...safeSpreadSecond];
}
export function imDeleteFromArray(array = [], index) {
  const firstPart = array.slice(0, index);
  const secondPart = array.slice(index + 1);

  return imArrayMerge(firstPart, secondPart);
}

export function imDeleteFromArrayById(array = [], idFieldName, idValue) {
  const indexToDelete = array.findIndex((arrayItem) => arrayItem[idFieldName] === idValue);

  return imDeleteFromArray(array, indexToDelete);
}
