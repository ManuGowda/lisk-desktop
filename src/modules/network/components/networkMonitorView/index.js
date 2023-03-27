import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from 'src/theme/box';
import BoxHeader from 'src/theme/box/header';
import Tooltip from 'src/theme/Tooltip';
import Peers from '../peers';
import Map from '../map';
import Statistics from '../statistics';
import styles from './network.css';

const Network = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Statistics />
      <Box className="map-box">
        <BoxHeader>
          <div>
            <h1 className={`${styles.contentHeader} contentHeader`}>{t('Connected peers')}</h1>
            <Tooltip position="right">
              <p>
                {t(
                  'The list shown only contains peers connected to the current Lisk Service node.'
                )}
              </p>
            </Tooltip>
          </div>
        </BoxHeader>
      </Box>
      <Map />
      <Peers />
    </div>
  );
};

export default Network;
