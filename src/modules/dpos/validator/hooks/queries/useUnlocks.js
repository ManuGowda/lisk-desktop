import { UNLOCKS, APPLICATION } from 'src/const/queries';
import {
  METHOD,
  LIMIT as limit,
  API_VERSION,
  API_METHOD,
} from 'src/const/config';
import { useInfiniteQuery } from '@tanstack/react-query';

/**
 * Creates a custom hook for votes unlocked queries
 *
 * @param {object} configuration - the custom query configuration object
 * @param {object} configuration.config - the query config
 * @param {object} configuration.config.params - the query config params
 * @param {number} [configuration.config.params.limit] - the query limit
 * @param {number} [configuration.config.params.offset] - the query offset
 * @param {string} [configuration.config.params.address] - account address
 * @param {string} [configuration.config.params.publicKey] - account public key
 * @param {string} [configuration.config.params.name] - account name
 * @param {string} configuration.options - the query options
 *
 * @returns the query object
 */
// eslint-disable-next-line import/prefer-default-export
export const useUnlocks = ({ config: customConfig = {}, options } = { }) => {
  const config = {
    url: `/api/${API_VERSION}/dpos/unlocks`,
    method: 'get',
    event: 'get.dpos.unlocks',
    ...customConfig,
    params: { limit, ...(customConfig?.params || {}) },
  };

  return useInfiniteQuery(
    [UNLOCKS, APPLICATION, METHOD, config],
    async ({ pageParam }) => API_METHOD[METHOD]({
      ...config,
      params: {
        ...config.params,
        ...pageParam,
      },
    }),
    {
      ...options,
      select: (data) => data.pages.reduce((prevPages, page) => {
        const newData = page?.data || {};
        const newUnlocks = page?.data.unlocking || [];
        return {
          ...page,
          data: {
            ...newData,
            unlocking: prevPages.data
              ? [...prevPages.data.unlocking, ...newUnlocks]
              : newUnlocks,
          },
        };
      }),
      getNextPageParam: (lastPage) => {
        const offset = lastPage.meta.count + lastPage.meta.offset;
        const hasMore = offset < lastPage.meta.total;
        return !hasMore ? undefined : { offset };
      },
    },
  );
};
