import { fireEvent, screen } from '@testing-library/react';
import mockBlockchainApplications from '@tests/fixtures/blockchainApplicationsExplore';
import { usePinBlockchainApplication } from '@blockchainApplication/manage/hooks/usePinBlockchainApplication';
import { renderWithRouter } from 'src/utils/testHelpers';
import BlockchainApplicationList from './BlockchainApplicationList';
import { BLOCKCHAIN_APPLICATION_LIST_LIMIT } from '../../const/constants';

jest.useFakeTimers();
jest.mock('@blockchainApplication/manage/hooks/usePinBlockchainApplication');
const mockTogglePin = jest.fn();
const mockedPins = [mockBlockchainApplications[0].chainID];

usePinBlockchainApplication.mockReturnValue({
  togglePin: mockTogglePin,
  pins: mockedPins,
  checkPinByChainId: jest.fn().mockReturnValue(true),
});

describe('BlockchainApplicationList', () => {
  const props = {
    applyFilters: jest.fn(),
    filters: jest.fn(),
    applications: {
      data: mockBlockchainApplications,
      isLoading: true,
      loadData: jest.fn(),
      error: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    renderWithRouter(BlockchainApplicationList, props);
  });

  it('should display properly', () => {
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Chain Id')).toBeTruthy();
    expect(screen.getByText('Status')).toBeTruthy();
    expect(screen.getByText('LSK deposited')).toBeTruthy();
    expect(screen.getByText('Applications')).toBeTruthy();
  });

  it('should display the right number of applications', () => {
    const blockchainAppRow = screen.getAllByTestId('applications-row');
    expect(blockchainAppRow).toHaveLength(mockBlockchainApplications.length);
  });

  it('should apply search filter', () => {
    const searchField = screen.getByTestId('application-filter');
    fireEvent.change(searchField, { target: { value: 'test' } });
    jest.runAllTimers();

    expect(props.applyFilters).toHaveBeenCalledWith(expect.objectContaining({
      search: 'test',
      offset: 0,
      limit: BLOCKCHAIN_APPLICATION_LIST_LIMIT,
    }));
  });

  it('should call the toggle function for the particular blockchain application been toggled', () => {
    const { chainID } = mockBlockchainApplications[0];

    fireEvent.click(screen.getAllByTestId('pin-button')[0]);
    expect(mockTogglePin).toHaveBeenCalledWith(chainID);
  });
});
