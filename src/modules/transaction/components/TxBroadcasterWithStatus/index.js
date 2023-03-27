import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { selectActiveTokenAccount } from 'src/redux/selectors';
import TxBroadcasterWithStatus from './TxBroadcasterWithStatus';

const mapStateToProps = (state) => ({
  transactions: state.transactions,
  account: selectActiveTokenAccount(state),
});

export default compose(connect(mapStateToProps), withTranslation())(TxBroadcasterWithStatus);
