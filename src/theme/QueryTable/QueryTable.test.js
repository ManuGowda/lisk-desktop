import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockBlocks } from 'src/modules/block/__fixtures__';
import blockRow from 'src/modules/block/components/blocks/blockRow';
import { QueryTable } from './QueryTable';

const queryHook = jest.fn(() => ({
  hasUpdate: false,
}));
const tableHeader = [
  {
    title: 'Height',
  },
  {
    title: 'Date',
  },
  {
    title: 'Generated by',
  },
  {
    title: 'Transactions',
  },
  {
    title: 'Generated',
  },
];
const row = blockRow;
const originalQuerySelector = document.querySelector;
const originalScrollY = window.scrollY;

describe('QueryTable', () => {
  const props = {
    queryHook,
    queryConfig: { config: { params: { limit: 20 } } },
    button: {
      label: 'New items',
    },
    row,
    header: tableHeader,
    showHeader: true,
  };

  it('displays properly', () => {
    queryHook.mockReturnValue({
      data: mockBlocks,
    });
    render(<QueryTable {...props} />);
    expect(screen.getByText('10322980')).toBeTruthy();
    expect(screen.getAllByText('30 Sep 2019, 02:25:30 PM')).toBeTruthy();
    expect(screen.getAllByText('menfei')).toBeTruthy();
  });

  it('displays the load new button', () => {
    const mockScrollIntoView = jest.fn().mockReturnValue(undefined);
    document.querySelector = jest.fn(() => ({
      getBoundingClientRect: jest.fn().mockReturnValue({ top: 80 }),
      scrollIntoView: mockScrollIntoView,
    }));
    window.scrollY = 40;
    queryHook.mockReturnValue({
      hasUpdate: true,
      addUpdate: jest.fn(),
      data: mockBlocks,
    });
    render(<QueryTable {...props} />);
    expect(screen.getByText('New items')).toBeTruthy();
    fireEvent.click(screen.getByText('New items'));
    expect(mockScrollIntoView).toHaveBeenCalledTimes(1);
    document.querySelector = originalQuerySelector;
    window.scrollY = originalScrollY;
  });

  it('displays empty fallback if data is unavailable', () => {
    queryHook.mockReturnValue({
      hasUpdate: true,
      data: {},
    });
    render(<QueryTable {...props} />);
    expect(screen.getByText('Nothing found.')).toBeTruthy();
  });
});
