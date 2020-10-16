import React from 'react';
import { mount } from 'enzyme';
import Result from './result';

describe('Multisignature result component', () => {
  let wrapper;

  const props = {
    t: v => v,
    transactionBroadcasted: jest.fn(),
    transactions: {
      confirmed: [],
      broadcastedTransactionsError: [],
      transactionsCreated: [],
    },
  };

  it('Should render properly on success', () => {
    wrapper = mount(
      <Result
        {...props}
        transactionInfo={{ id: 1 }}
        transactions={{
          ...props.transactions,
          confirmed: [{ id: 1 }],
        }}
      />,
    );
    const html = wrapper.html();
    expect(html).toContain('transaction-status');
    expect(html).toContain('You have successfully signed the transaction');
    expect(html).toContain('Download');
    expect(html).toContain('Copy');
  });

  it('Should render properly on error', () => {
    wrapper = mount(
      <Result
        {...props}
        error={{ message: 'error:test' }}
      />,
    );
    const html = wrapper.html();
    expect(html).toContain('transaction-status');
    expect(html).toContain('Oops, looks like something went wrong.');
    expect(html).toContain('Report the error via E-Mail');
  });
});
