/* istanbul ignore file */
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  METHOD,
  API_METHOD,
} from 'src/const/config';

/**
 * Creates a custom hook for inifinite queries
 *
 * @param {object} configuration - the custom query configuration object
 * @param {string[]} configuration.keys - the query keys
 * @param {Object} configuration.config - the query config
 * @param {Object} configuration.config.params - the query config params
 * @param {number} configuration.config.params.limit - the query limit
 * @param {number} configuration.config.params.offset - the query offset
 * @param {string} configuration.config.params.sort - the query sort
 * @param {string} configuration.options - the query options
 *
 * @returns the query object
 */
// eslint-disable-next-line import/prefer-default-export
export const useCustomInfiniteQuery = ({
  keys = [],
  config = {},
  options = {},
}) => useInfiniteQuery(
  keys,
  async ({ pageParam }) => API_METHOD[METHOD]({
    ...config,
    params: {
      ...(config.params || {}),
      ...pageParam,
    },
  }),
  {
    ...options,
    select: (data) => data.pages.reduce((prevPages, page) => {
      const newData = page?.data || [];
      return {
        ...page,
        data: prevPages.data ? [...prevPages.data, ...newData] : newData,
      };
    }),
    getNextPageParam: (lastPage = {}) => {
      const lastPageCount = lastPage.meta?.count || 0;
      const lastPageOffset = lastPage.meta?.offset || 0;

      const offset = lastPageCount + lastPageOffset;
      const hasMore = offset < (lastPage.meta?.total ?? Infinity);
      return !hasMore ? undefined : { offset };
    },
  },
);
