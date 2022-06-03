import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from 'src/utils/testHelpers';
import mockSavedAccounts from '@tests/fixtures/accounts';
import BackupRecoveryPhraseFlow from './BackupRecoveryPhraseFlow';

jest.mock('../../hooks/useAccounts', () => ({
  useAccounts: jest.fn().mockReturnValue([mockSavedAccounts]),
}));

const props = {
  history: { push: jest.fn() },
};

describe('Backup account recovery phrase flow', () => {
  it('Should successfully go though the flow', async () => {
    renderWithRouter(BackupRecoveryPhraseFlow, props);
    expect(screen.getByText('Enter your password')).toBeTruthy();
    expect(
      screen.getByText(
        'Please provide your device password to backup the recovery phrase.',
      ),
    ).toBeTruthy();
    expect(screen.getByTestId('passwordField')).toBeTruthy();
    expect(screen.getByText('Continue')).toBeTruthy();

    const passwordField = screen.getByTestId('passwordField');
    fireEvent.change(passwordField, { target: { value: 't3stP@ssw0rD' } });
    fireEvent.click(screen.getByText('Continue'));

    expect(screen.getByText('Save your secret recovery phrase')).toBeTruthy();
    expect(
      screen.getByText(
        'Keep it safe as it is the only way to access your wallet.',
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        'Please carefully write down these 12 words and store them in a safe place.',
      ),
    ).toBeTruthy();
    expect(screen.getByText('Copy')).toBeTruthy();
    expect(screen.getByText('I have written them down')).toBeTruthy();
    expect(screen.getByText('Go back')).toBeTruthy();

    fireEvent.click(screen.getByText('I have written them down'));

    expect(
      screen.getByText('Confirm your secret recovery phrase'),
    ).toBeTruthy();
    expect(
      screen.getByText(
        'Please choose the correct words from the list below to complete your secret recovery phrase.',
      ),
    ).toBeTruthy();
    expect(screen.getByText('Secret recovery phrase')).toBeTruthy();
    expect(screen.getByText('Confirm')).toBeTruthy();
    expect(screen.getByText('Go back')).toBeTruthy();

    // @TODO: Update below when useDecrypt hook becomes available
    fireEvent.click(screen.getByText('solution'));
    fireEvent.click(screen.getByText('vendor'));
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(screen.getByText("Perfect! You're all set")).toBeTruthy();
      expect(
        screen.getByText(
          'You can now download your encrypted secret recovery phrase and use it to add your account on other devices.',
        ),
      ).toBeTruthy();
      expect(screen.getByText('Download')).toBeTruthy();

      fireEvent.click(screen.getByText('Continue to Wallet'));
    });
  });
});
