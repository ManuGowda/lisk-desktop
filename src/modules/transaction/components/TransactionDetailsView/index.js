import React, { useMemo, useState } from 'react';
import { isEmpty } from 'src/utils/helpers';
import ReactJson from 'react-json-view';
import { useTranslation } from 'react-i18next';
import { parseSearchParams } from 'src/utils/searchParams';
import { withRouter } from 'react-router';
import Box from 'src/theme/box';
import BoxContent from 'src/theme/box/content';
import Heading from 'src/modules/common/components/amountField/Heading';
import BoxHeader from 'src/theme/box/header';
import Table from 'src/theme/table';
import TokenAmount from 'src/modules/token/fungible/components/tokenAmount';
import DateTimeFromTimestamp from 'src/modules/common/components/timestamp';
import NotFound from './notFound';
import styles from './styles.css';
import TransactionEvents from '../TransactionEvents';
import { useTransactions } from '../../hooks/queries';
import TransactionDetailRow from '../TransactionDetailRow';
import header from './headerMap';

const TransactionDetails = ({ location }) => {
  const transactionId = parseSearchParams(location.search).transactionId;
  const { t } = useTranslation();
  const [isParamsCollasped, setIsparamsCollapsed] = useState(false);

  const {
    data: transactions,
    error,
    isLoading,
    isFetching,
  } = useTransactions({
    config: {
      params: {
        id: transactionId,
      },
    },
  });

  const transaction = useMemo(() => transactions?.data?.[0] || {}, [transactions]);
  const transactionDetailList = useMemo(() => {
    if (isLoading) return [];

    const { id, moduleCommandName, sender, nonce, fee, block, confirmations, executionStatus } =
      transaction;
    const [txModule, txType] = moduleCommandName.split(':');

    return [
      {
        label: 'Transaction type',
        value: `${txModule} ${txType}`,
        isCapitalized: true
      },
      {
        label: 'Sender',
        value: sender,
        type: 'address',
      },
      {
        label: 'Transaction Fee',
        value: <TokenAmount val={fee} token="LSK" />,
      },
      {
        label: 'Date',
        value: <DateTimeFromTimestamp fulltime time={block.timestamp} />,
      },
      {
        label: 'Nonce',
        value: nonce,
      },
      {
        label: 'Confirmations',
        value: confirmations,
      },
      {
        label: 'Status',
        value: executionStatus,
        type: 'status',
        tooltip: 'status sdfasdf',
      },
      {
        label: 'Transaction ID',
        value: id,
      },
      {
        label: 'Block ID',
        value: block.id,
      },
      {
        label: 'Block Height',
        value: block.height,
      },
      {
        label: 'Parameters',
        type: 'expand',
      },
    ];
  }, [transaction]);

  if (error && isEmpty(transactions?.data)) {
    return <NotFound t={t} />;
  }

  return (
    <div className={styles.wrapper}>
      <Heading title={`Transaction ${transaction.id}`} className={styles.heading} />
      <div className={styles.body}>
        <Box isLoading={isLoading} className={styles.container}>
          <BoxHeader>
            <h1>{t('Details')}</h1>
          </BoxHeader>
          <BoxContent>
            <Table
              data={transactionDetailList}
              isLoading={isFetching}
              row={TransactionDetailRow}
              header={header(t)}
              headerClassName={styles.tableHeader}
              additionalRowProps={{
                isParamsCollasped,
                onToggleJsonView: () => setIsparamsCollapsed((state) => !state),
              }}
            />
            <div
              data-testid="transaction-event-json-viewer"
              className={`${styles.jsonContainer} ${!isParamsCollasped ? styles.shrink : ''}`}
            >
              <ReactJson name={false} src={transaction.params} />
            </div>
          </BoxContent>
        </Box>
        <Box isLoading={isLoading} className={styles.container}>
          <BoxHeader>
            <h1>{t('Events')}</h1>
          </BoxHeader>
          <BoxContent>
            <TransactionEvents />
          </BoxContent>
        </Box>
      </div>
    </div>
  );
};

export default withRouter(TransactionDetails);
