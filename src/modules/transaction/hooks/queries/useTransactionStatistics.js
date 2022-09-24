/* istanbul ignore file */
import { TRANSACTION_STATISTICS } from 'src/const/queries';
import { LIMIT as limit, API_VERSION } from 'src/const/config';
import { useCustomInfiniteQuery } from 'src/modules/common/hooks';

/**
 * Creates a custom hook for transaction statistics list query
 *
 * @param {object} configuration - the custom query configuration object
 * @param {object} configuration.config - the query config
 * @param {object} configuration.config.params - the query config params
 * @param {string} configuration.config.params.interval - the query's interval. i.e "day"|"month"
 * @param {number} [configuration.config.params.limit] - the query limit
 * @param {number} [configuration.config.params.offset] - the query offset
 *
 * @returns the query object
 */
// eslint-disable-next-line import/prefer-default-export
export const useTransactionStatistics = ({ config: customConfig = {}, options } = {}) => {
  const config = {
    url: `/api/${API_VERSION}/transactions/statistics`,
    method: 'get',
    event: 'get.transactions.statistics',
    ...customConfig,
    params: { limit, ...(customConfig?.params || {}) },
  };
  const customOptions = {
    ...options,
    select: (data) =>
      data.pages.reduce((prevPages, page) => {
        const newData = page?.data || {};
        const newTimelines = page?.data.timeline || {};
        return {
          ...page,
          data: {
            ...newData,
            // Do an array spread for each TL key
            timeline: prevPages.data
              ? { ...prevPages.data.timeline, ...newTimelines }
              : newTimelines,
          },
        };
      }),
  };
  return useCustomInfiniteQuery({
    keys: [TRANSACTION_STATISTICS],
    options: customOptions,
    config,
  });
};
