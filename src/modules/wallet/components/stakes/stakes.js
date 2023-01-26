import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import routes from 'src/routes/routes';
import { isEmpty } from 'src/utils/helpers';
import Box from '@theme/box';
import BoxHeader from '@theme/box/header';
import BoxContent from '@theme/box/content';
import { Input } from 'src/theme';
import Table from '@theme/table';
import styles from './stakes.css';
import StakeRow from './stakeRow';
import header from './stakesTableHeader';

const getMessages = (t) => ({
  all: t('This account doesn’t have any stakes.'),
  filtered: t(
    'This account doesn’t have any stakes matching the searched username.',
  ),
});

const Stakes = ({
  votes, accounts, address, t, history,
}) => {
  const [filterValue, setFilterValue] = useState('');
  const messages = getMessages(t);

  const handleFilter = ({ target }) => {
    setFilterValue(target.value);
  };

  const onRowClick = (rowAddress) => {
    const accountAddress = `${routes.explorer.path}?address=${rowAddress}`;
    history.push(accountAddress);
  };

  useEffect(() => {
    votes.loadData({ address });
  }, [address]);

  // Fetch validator profiles to define rank, productivity and validator weight
  useEffect(() => {
    const addressList = votes.data.map((item) => item.address);
    if (isEmpty(accounts.data) && addressList.length) {
      accounts.loadData({ addressList, isValidator: true });
    }
  }, [votes.data]);

  const areLoading = accounts.isLoading || votes.isLoading;
  const filteredStakes = votes.data.filter((vote) => {
    if (!vote.username) return false;
    return (
      vote.username.indexOf(filterValue) > -1
      || vote.address.indexOf(filterValue) > -1
    );
  });

  return (
    <Box main isLoading={areLoading} className={`${styles.wrapper}`}>
      <BoxHeader>
        <h1>{t('Staked validators')}</h1>
        <div className={`${styles.filterHolder}`}>
          <Input
            className="search"
            disabled={!votes.data.length}
            name="filter"
            value={filterValue}
            placeholder={t('Filter by name')}
            onChange={handleFilter}
            size="m"
          />
        </div>
      </BoxHeader>
      <BoxContent className={`${styles.results} stakes-tab`}>
        <Table
          data={filteredStakes}
          isLoading={areLoading}
          iterationKey="address"
          emptyState={{
            message: filterValue ? messages.filtered : messages.all,
          }}
          row={StakeRow}
          additionalRowProps={{
            onRowClick,
            accounts: accounts.data,
          }}
          header={header(t)}
        />
      </BoxContent>
    </Box>
  );
};

Stakes.propTypes = {
  address: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export default Stakes;
