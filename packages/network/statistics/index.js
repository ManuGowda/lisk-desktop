import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withData from '@common/utilities/withData';
import { getNetworkStatistics } from '@network/utilities/api';
import { tokenMap } from '@token/configuration/tokens';
import Statistics from './statistics';

export default compose(
  withData({
    networkStatistics: {
      apiUtil: network => getNetworkStatistics({ network }, tokenMap.LSK.key),
      defaultData: {},
      autoload: true,
      transformResponse: response => response.data,
    },
  }),
  withTranslation(),
)(Statistics);
