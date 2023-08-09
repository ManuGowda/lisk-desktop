import axios from 'axios';

export const DEFAULT_NETWORK_FORM_STATE = {
  name: '',
  serviceUrl: '',
  wsServiceUrl: '',
};

export function getDuplicateNetworkFields(newNetwork, networks, networkToExclude) {
  if (!newNetwork || !networks) {
    return undefined;
  }

  const newNetworkValues = Object.values(newNetwork);

  const result = networks.reduce((accumResult, network) => {
    const excluded = network.name === networkToExclude;
    if (excluded) {
      return accumResult;
    }

    const duplicateFields = Object.entries(network).reduce((accum, [key, value]) => {
      if (
        newNetworkValues.includes(value) &&
        Object.keys(DEFAULT_NETWORK_FORM_STATE).includes(key)
      ) {
        const safeSpread = accum || {};

        return {
          ...safeSpread,
          [key]: value,
        };
      }

      return accum;
    }, {});

    return (
      (accumResult || duplicateFields) && {
        ...accumResult,
        ...duplicateFields,
      }
    );
  }, {});

  return Object.keys(result).length > 0 ? result : undefined;
}

export async function isNetworkUrlSuccess(url) {
  try {
    await axios({ url, timeout: 4000 });
    return true;
  } catch (error) {
    return false;
  }
}
