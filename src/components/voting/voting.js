import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import styles from './voting.css';
import DelegateSidebar from '../delegateSidebar';
import DelegateList from '../delegateList';

class Voting extends React.Component {
  constructor() {
    super();
    this.state = {
      showChangeSummery: false,
    };
  }

  toggleSummery() {
    this.setState({
      showChangeSummery: !this.state.showChangeSummery,
    });
  }

  render() {
    const { votes } = this.props;
    return (
      <div className={`${grid.row} ${styles.wrapper}`} >
        <aside className={`${grid['col-md-4']}`}>
          {this.state.showChangeSummery}
          <DelegateSidebar votes={votes} updateList={this.toggleSummery.bind(this)} />
        </aside>
        <section className={`${grid['col-sm-12']} ${grid['col-md-8']}`}>
          <DelegateList showChangeSummery={this.state.showChangeSummery} />
        </section>
      </div>
    );
  }
}

export default Voting;
