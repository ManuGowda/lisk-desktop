import { useQuery } from '@tanstack/react-query';
import { NETWORK_STATUS, APPLICATION } from 'src/const/queries';
import {
  METHOD,
  API_VERSION,
  API_METHOD,
} from 'src/const/config';

/**
 * Creates a custom hook for network status query
 *
 * @param {object} configuration - the custom query configuration object
 * @param {object} configuration.config - the query config
 * @param {object} configuration.config.params - the query parameters
 * @param {string} configuration.options - the query options
 *
 * @returns the query object
 */
// eslint-disable-next-line import/prefer-default-export
export const useNetworkStatus = ({ config: customConfig = {}, options } = { }) => {
  const config = {
    url: `/api/${API_VERSION}/network/status`,
    method: 'get',
    event: 'get.network.status',
    ...customConfig,
  };
  return useQuery(
    [NETWORK_STATUS, APPLICATION, METHOD, config],
    async () => API_METHOD[METHOD](config),
    {
      ...options,
    },
  );
};
