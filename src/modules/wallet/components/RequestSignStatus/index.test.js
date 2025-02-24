import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import * as reactRedux from 'react-redux';
import { useSession } from '@libs/wcm/hooks/useSession';
import { renderWithRouterAndQueryClient } from 'src/utils/testHelpers';
import RequestSignStatus from './index';

jest.mock('@walletconnect/utils', () => ({
  getSdkError: jest.fn((str) => str),
}));

jest.mock('@libs/wcm/utils/connectionCreator', () => ({
  createSignClient: jest.fn(() => Promise.resolve()),
  client: {
    pair: jest.fn(),
  },
}));

jest.mock('@libs/wcm/hooks/useSession');
jest.spyOn(reactRedux, 'useSelector');

const proposal = {};
const respond = jest.fn(() => ({
  status: 'SUCCESS',
  data: proposal,
}));

const reject = jest.fn(() => ({
  status: 'SUCCESS',
  data: proposal,
}));
const props = {
  history: {
    push: jest.fn(),
  },
  status: 'success',
  formProps: {
    url: 'http://example.com',
  },
};
const successTransactions = {
  signedTransaction: {
    signatures: [Buffer.alloc(64)],
  },
  txSignatureError: null,
};
const failureTransactions = {
  signedTransaction: {},
  txSignatureError: 'error',
};

describe('RequestSignStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render the signature success result', () => {
    reactRedux.useSelector.mockReturnValue(successTransactions);
    useSession.mockReturnValue({ respond, reject });
    renderWithRouterAndQueryClient(RequestSignStatus, props);
    expect(screen.getByText('Transaction signature successful')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Your transaction has been signed. Please copy the signed transaction and return to application.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Copy signature')).toBeInTheDocument();
    expect(screen.getByText('Return to application')).toBeInTheDocument();
  });

  it('render the signature failure result', () => {
    reactRedux.useSelector.mockReturnValue(failureTransactions);
    useSession.mockReturnValue({ respond, reject });
    renderWithRouterAndQueryClient(RequestSignStatus, props);
    expect(screen.getByText('Transaction signature failure')).toBeInTheDocument();
    expect(
      screen.getByText(
        'There was an error signing your transaction. please close this dialog and try again.'
      )
    ).toBeInTheDocument();
    expect(screen.queryAllByText('Copy signature')).toHaveLength(0);
    expect(screen.getByText('Return to application')).toBeInTheDocument();
  });

  it('copy the signature if clicked on the copy button', () => {
    reactRedux.useSelector.mockReturnValue(successTransactions);
    useSession.mockReturnValue({ respond });
    renderWithRouterAndQueryClient(RequestSignStatus, props);
    expect(screen.getByText('Copy signature')).toBeInTheDocument();
    const button = screen.getAllByRole('button')[0];
    act(() => {
      fireEvent.click(button);
    });
    expect(respond).toHaveBeenCalled();
    expect(screen.getByText('Copied')).toBeInTheDocument();

    jest.runOnlyPendingTimers();
    expect(screen.getByText('Copy signature')).toBeInTheDocument();
  });
});
