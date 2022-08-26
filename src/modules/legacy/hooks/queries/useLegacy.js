import { LEGACY } from 'src/const/queries';
import { API_VERSION } from 'src/const/config';
import { useCustomQuery } from 'src/modules/common/hooks';

/**
 * Creates a custom hook for legacy account queries
 *
 * @param {object} configuration - the custom query configuration object
 * @param {object} configuration.config - the query config
 * @param {object} configuration.config.params - the query config params
 * @param {string} configuration.config.params.publicKey - account public key
 * @param {string} configuration.options - the query options
 *
 * @returns the query object
 */
// eslint-disable-next-line import/prefer-default-export
export const useLegacy = ({ config: customConfig = {}, options } = {}) => {
  const config = {
    url: `/api/${API_VERSION}/legacy`,
    method: 'get',
    event: 'get.legacy',
    ...customConfig,
    params: { publicKey: '', ...customConfig.params },
  };
  return useCustomQuery({
    keys: [LEGACY],
    config,
    options,
  });
};
