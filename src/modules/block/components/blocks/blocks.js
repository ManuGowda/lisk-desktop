import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from 'src/theme/box';
import BoxContent from 'src/theme/box/content';
import FilterBar from 'src/modules/common/components/filterBar';
import StickyHeader from 'src/theme/table/stickyHeader';
import { QueryTable } from '@theme/QueryTable';
import transformParams from 'src/utils/transformParams';
import { useBlocks } from '../../hooks/queries/useBlocks';
import BlocksOverview from '../blocksOverview';
import BlockFilterDropdown from './blockFilterDropdown';
import BlockRow from './blockRow';
import header from './tableHeader';
import styles from './blocks.css';

export const defaultFilters = {
  dateFrom: '',
  dateTo: '',
  height: '',
  generatorAddress: '',
};

// eslint-disable-next-line max-statements
const Blocks = ({ filters, applyFilters, clearFilter, clearAllFilters, sort, changeSort }) => {
  const { t } = useTranslation();
  const [params, setParams] = useState();
  const formatters = {
    height: (value) => `${t('Height')}: ${value}`,
    /* istanbul ignore next */
    generatorAddress: (value) => `${t('Generated by')}: ${value}`,
  };

  const applyBlockFilters = (blockFilters) => {
    const updateApplyFilterData = (usedFilters) => setParams(transformParams(usedFilters));
    applyFilters(blockFilters, null, updateApplyFilterData);
  };

  const clearBlockFilter = (name) => {
    const filterData = {
      ...filters,
      [name]: defaultFilters[name],
    };
    const updateFilterData = () => setParams(transformParams(filterData));
    clearFilter(name, updateFilterData);
  };

  const clearAllBlockFilters = () => {
    const clearFilterData = () => setParams({});
    clearAllFilters(clearFilterData);
  };

  const changeBlockSort = (id) => {
    const sortData = {
      ...filters,
      sort: `${id}:${sort.includes('asc') ? 'desc' : 'asc'}`,
    };
    const updateSort = () => setParams(transformParams(sortData));
    changeSort(id, updateSort);
  };

  /* istanbul ignore next */
  const loadLastBlocks = () => {
    applyBlockFilters(filters);
  };

  return (
    <div>
      <BlocksOverview t={t} />
      <Box className="blocks-container" width="full" main>
        <StickyHeader title={t('All blocks')} className={styles.header} />
        <BlockFilterDropdown filters={filters} applyFilters={applyBlockFilters} />
        <FilterBar
          {...{
            clearFilter: clearBlockFilter,
            clearAllFilters: clearAllBlockFilters,
            filters,
            formatters,
          }}
        />
        <BoxContent className={`${styles.content} block-results`}>
          <QueryTable
            showHeader
            button={{
              label: t('New blocks'),
              onClick: loadLastBlocks,
              className: styles.loadLatestBtn,
            }}
            queryHook={useBlocks}
            queryConfig={{ config: { params } }}
            row={BlockRow}
            header={header(changeBlockSort, t)}
            headerClassName={styles.tableHeader}
            currentSort={sort}
            scrollToSelector=".blocks-container"
          />
        </BoxContent>
      </Box>
    </div>
  );
};

Blocks.propTypes = {
  filters: PropTypes.shape({
    dateFrom: PropTypes.string.isRequired,
    dateTo: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    generatorAddress: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blocks;
