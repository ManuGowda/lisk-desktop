import React from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from 'src/routes/routes';
import grid from 'flexboxgrid/dist/flexboxgrid.css';

import LayoutSchema from './layoutSchema';
import TransactionRowContext from '../../context/transactionRowContext';
import styles from './schemas.css';

const TransactionRow = ({
  data,
  className,
  t,
  currentBlockHeight,
  host,
  layout,
  avatarSize,
  activeToken,
  delegates,
  address,
}) => {
  const Layout = LayoutSchema[layout] || LayoutSchema.default;

  return (
    <Link
      className={`${grid.row} ${styles.container} ${styles[layout]} ${className} transactions-row`}
      to={`${routes.transactionDetails.path}?transactionID=${data.id}`}
    >
      <TransactionRowContext.Provider
        value={{
          currentBlockHeight,
          data,
          host,
          activeToken,
          avatarSize,
          delegates,
          address,
        }}
      >
        {Layout.components.map((Component, index) => (
          <Component key={index} t={t} />
        ))}
      </TransactionRowContext.Provider>
    </Link>
  );
};

/* istanbul ignore next */
const areEqual = (prevProps, nextProps) =>
  prevProps.data.id === nextProps.data.id &&
  prevProps.currentBlockHeight === nextProps.currentBlockHeight;

export default React.memo(withTranslation()(TransactionRow), areEqual);
