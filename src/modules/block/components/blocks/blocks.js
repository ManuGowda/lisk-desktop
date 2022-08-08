import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import withFilters from 'src/utils/withFilters';
import Box from 'src/theme/box';
import BoxContent from 'src/theme/box/content';
import FilterBar from 'src/modules/common/components/filterBar';
import StickyHeader from 'src/theme/table/stickyHeader';
import Table from 'src/theme/table';
import { transformStringDateToUnixTimestamp } from 'src/utils/dateTime';
import BlocksOverview from '../../manager/blocksOverviewManager';
import { useBlocks } from '../../hooks/queries/useBlocks';
import BlockFilterDropdown from './blockFilterDropdown';
import BlockRow from './blockRow';
import header from './tableHeader';
import styles from './blocks.css';

const defaultFilters = {
  dateFrom: '',
  dateTo: '',
  height: '',
  generatorAddress: '',
};

// eslint-disable-next-line max-statements
const Blocks = ({
  filters,
  applyFilters,
  clearFilter,
  clearAllFilters,
  sort,
  changeSort,
}) => {
  const { t } = useTranslation();
  const [config, setConfig] = useState({ params: {} });
  const {
    data: blocks, error, isLoading, isFetching, fetchNextPage, hasNextPage,
  } = useBlocks({ config });

  const formatters = {
    height: (value) => `${t('Height')}: ${value}`,
    /* istanbul ignore next */
    generatorAddress: (value) => `${t('Generated by')}: ${value}`,
  };

  const transformParams = (params) =>
    Object.keys(params).reduce((acc, item) => {
      switch (item) {
        case 'dateFrom':
          if (params[item]) {
            if (!acc.timestamp) acc.timestamp = ':';
            acc.timestamp = acc.timestamp.replace(
              /(\d+)?:/,
              `${transformStringDateToUnixTimestamp(params[item])}:`,
            );
          }
          break;
        case 'dateTo':
          if (params[item]) {
            if (!acc.timestamp) acc.timestamp = ':';
            // We add 86400 so the range is inclusive
            acc.timestamp = acc.timestamp.replace(
              /:(\d+)?/,
              `:${transformStringDateToUnixTimestamp(params[item]) + 86400}`,
            );
          }
          break;
        default:
          acc[item] = params[item];
      }

      return acc;
    }, {});

  const handleLoadMore = () => {
    const searchParams = Object.keys(filters).reduce(
      (acc, key) => ({
        ...acc,
        ...(filters[key] && { [key]: filters[key] }),
      }),
      {
        offset: blocks.data.length,
        sort,
      },
    );
    fetchNextPage({ pageParam: transformParams(searchParams) });
  };

  const applyBlockFilters = (blockFilters) => {
    const updateApplyFilterData = (usedFilters) =>
      setConfig({ params: transformParams(usedFilters) });
    applyFilters(blockFilters, null, updateApplyFilterData);
  };

  const clearBlockFilter = (name) => {
    const filterData = {
      ...filters,
      [name]: defaultFilters[name],
    };
    const updateFilterData = () => setConfig({ params: transformParams(filterData) });
    clearFilter(name, updateFilterData);
  };

  const clearAllBlockFilters = () => {
    const clearFilterData = () => setConfig({ params: {} });
    clearAllFilters(clearFilterData);
  };

  const changeBlockSort = (id) => {
    const updateSort = setConfig({ params: transformParams(filters) });
    changeSort(id, updateSort);
  };

  /* istanbul ignore next */
  const loadLastBlocks = () => {
    applyBlockFilters(filters);
  };

  return (
    <div>
      <BlocksOverview t={t} />
      <Box
        isLoading={isFetching}
        className="blocks-container"
        width="full"
        main
      >
        <StickyHeader
          title={t('All blocks')}
          button={{
            entity: 'block',
            error,
            onClick: loadLastBlocks,
            label: t('New blocks'),
          }}
          scrollToSelector=".blocks-container"
          filters={(
            <BlockFilterDropdown
              filters={filters}
              applyFilters={applyBlockFilters}
            />
          )}
        />
        <FilterBar
          {...{
            clearFilter: clearBlockFilter,
            clearAllFilters: clearAllBlockFilters,
            filters,
            formatters,
            t,
          }}
        />
        <BoxContent className={`${styles.content} block-results`}>
          <Table
            showHeader
            data={blocks.data}
            isLoading={isLoading}
            row={BlockRow}
            loadData={handleLoadMore}
            header={header(changeBlockSort, t)}
            headerClassName={styles.tableHeader}
            currentSort={sort}
            canLoadMore={hasNextPage}
            error={error}
          />
        </BoxContent>
      </Box>
    </div>
  );
};

Blocks.propTypes = {
  t: PropTypes.func.isRequired,
  blocks: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
};
const defaultSort = 'height:desc';

export default withFilters('blocks', defaultFilters, defaultSort)(Blocks);
