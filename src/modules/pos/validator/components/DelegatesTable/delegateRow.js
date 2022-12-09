import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import routes from 'src/routes/routes';
import { addedToWatchList, removedFromWatchList } from 'src/redux/actions';
import getForgingTime from '../../utils/getForgingTime';
import ValidatorRowContext from '../../context/validatorRowContext';
import delegateStyles from '../ValidatorsMonitorView/Validators.css';
import styles from './schemas.css';
import LayoutSchema from './layoutSchema';

const DelegateRow = ({ data, className, activeTab, watchList, setActiveTab }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const formattedForgingTime = getForgingTime(data.nextForgingTime);

  const isWatched = watchList.find((address) => address === data.address);

  const removeFromWatchList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (watchList.length === 1) {
      setActiveTab('active');
    }
    dispatch(removedFromWatchList({ address: data.address }));
  };

  const addToWatchList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addedToWatchList({ address: data.address }));
  };

  const Layout = LayoutSchema[activeTab] || LayoutSchema.default;
  const activeStyle = activeTab === 'active' ? styles.fullLayout : styles[activeTab];

  return (
    <Link
      className={`${className} delegate-row ${styles.container} ${activeStyle} ${delegateStyles.tableRow}`}
      to={`${routes.validatorProfile.path}?address=${data.address}`}
    >
      <ValidatorRowContext.Provider
        value={{
          data,
          activeTab,
          watched: isWatched,
          addToWatchList,
          removeFromWatchList,
          time: formattedForgingTime,
          t,
        }}
      >
        {Layout.components.map((Component, index) => (
          <Component key={index} t={t} />
        ))}
      </ValidatorRowContext.Provider>
    </Link>
  );
};

export default React.memo(DelegateRow);
