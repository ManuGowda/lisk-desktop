import http from '@common/utilities/api/http';
import { httpPaths } from '../../constants/constants';

/**
 * Retrieves block details.
 *
 * @param {Object} data
 * @param {String?} data.params.blockId - Block id
 * @param {Number?} data.params.height - Block height
 * @param {String?} data.baseUrl - Lisk Service API url to override the
 * existing ServiceUrl on the network param. We may use this to retrieve
 * the details of an archived transaction.
 * @param {Object} data.network - Network setting from Redux store
 * @returns {Promise} http call
 */
 export const getBlock = ({
    params = {}, network, baseUrl,
  }) => {
    try {
      const blockProps = getBlockProps(params);
      return http({
        path: httpPaths.block,
        params: blockProps,
        network,
        baseUrl,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
