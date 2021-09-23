import React from 'react';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import Box from '@toolbox/box';
import BoxHeader from '@toolbox/box/header';
import BoxContent from '@toolbox/box/content';
import NotFound from '@shared/notFound';
import { isEmpty } from '@utils/helpers';
import delegatePerformanceDetails from './delegatePerformanceDetails';
import styles from './styles.css';

// eslint-disable-next-line max-statements
const DelegatePerformance = ({ delegate: { error, isLoading, data } } = {}) => {
  if (!error && isEmpty(data)) {
    return <div />;
  }

  if (error && isEmpty(data)) {
    return <NotFound />;
  }

  const { dpos: { delegate: { pomHeights, status, consecutiveMissedBlocks } } } = data;
  let title = '';
  switch (status) {
    case 'punished':
      title = 'Punishment details';
      break;

    case 'banned':
      title = 'Banning details';
      break;

    default:
      title = 'Unknown details';
  }
  // {`${grid.row} ${styles.content}`}
  return (
    <Box isLoading={isLoading} className={`${styles.container}`}>
      <BoxHeader className={styles.container}>
        <h1>{title}</h1>
      </BoxHeader>
      <BoxContent className={styles.content}>
        <p className={styles.description}>
          {delegatePerformanceDetails(pomHeights.length, status, consecutiveMissedBlocks)}
        </p>
        <Box className={`${grid.row} ${styles.performanceContainer}`}>
          <Box className={`${grid['col-md-6']}`}>
            <p className={`${styles.start} ${styles.header}`}>Punishment starts</p>
          </Box>
          <Box className={`${grid['col-md-6']}`}>
            <p className={`${styles.end} ${styles.header}`}>Punishment ends</p>
          </Box>
        </Box>
        {pomHeights && pomHeights.map((height, index) => (
          <Box className={`${grid.row} ${styles.performanceContainer}`} key={`${height}-${index}`}>
            <Box className={`${grid['col-md-6']}`}>
              <p className={styles.start}>{height.start}</p>
            </Box>
            <Box className={`${grid['col-md-6']}`}>
              <p className={styles.end}>{height.end}</p>
            </Box>
          </Box>
        ))}
      </BoxContent>
    </Box>
  );
};

export default DelegatePerformance;
