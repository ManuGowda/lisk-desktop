import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import Transactions from './transactions';
import withData from '../../../../utils/withData';
import { getTransactions } from '../../../../utils/api/transaction';
import { toRawLsk } from '../../../../utils/lsk';
import { transformStringDateToUnixTimestamp } from '../../../../utils/datetime';

const transformParams = params => Object.keys(params)
  .reduce((acc, item) => {
    if (item === 'amountFrom' || item === 'amountTo') {
      acc[item] = toRawLsk(params[item]);
    } else if (item === 'dateFrom' || item === 'dateTo') {
      acc[item] = transformStringDateToUnixTimestamp(params[item]);
    } else {
      acc[item] = params[item];
    }

    return acc;
  }, {});

export default compose(
  withData({
    transactions: {
      apiUtil: (network, { token, ...params }) =>
        getTransactions({ network, params: transformParams(params) }, token),
      getApiParams: state => ({
        token: state.settings.token.active,
      }),
      defaultData: [],
      autoload: true,
      transformResponse: (response, oldData, urlSearchParams) => (
        urlSearchParams.offset
          ? [...oldData, ...response.data.filter(block =>
            !oldData.find(({ id }) => id === block.id))]
          : response.data
      ),
    },
  }),
  withTranslation(),
)(Transactions);
