import React from 'react';
import { TertiaryButton } from '../toolbox/buttons/button';
import { checkIfInsideLiskApp } from '../../utils/hwManager';
import Illustration from '../toolbox/illustration';
import externalLinks from '../../constants/externalLinks';
import routes from '../../constants/routes';

class UnlockDevice extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
    };

    this.timeout = null;
    this.checkIfInsideLiskApp = this.checkIfInsideLiskApp.bind(this);
  }

  componentDidMount() {
    this.navigateIfNeeded();
    this.checkIfInsideLiskApp();
  }

  componentDidUpdate() {
    this.navigateIfNeeded();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  get selectedDevice() {
    return this.props.devices.find(d => d.deviceId === this.props.deviceId) || {};
  }

  navigateIfNeeded() {
    clearTimeout(this.timeout);
    const selectedDevice = this.selectedDevice;
    if (!selectedDevice.model) {
      this.props.prevStep({ reset: true });
    } else if (selectedDevice.openApp) {
      this.props.nextStep({ device: selectedDevice });
    } else {
      this.timeout = setTimeout(this.checkIfInsideLiskApp, 1000);
    }
  }

  async checkIfInsideLiskApp() {
    await checkIfInsideLiskApp({ id: this.props.deviceId });
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { t, history } = this.props;
    const selectedDevice = this.selectedDevice;
    return (!this.state.isLoading && !!selectedDevice.model) ? (
      <div>
        <h1>{t('{{deviceModel}} connected! Open the Lisk app on the device', { deviceModel: selectedDevice.model })}</h1>
        <p>
          { t('If you’re not sure how to do this please follow the') }
          {' '}
          <a
            href={externalLinks.ledgerNanoSHelp}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('Official guidelines')}
          </a>
        </p>
        <Illustration name="ledgerNanoLight" />
        <TertiaryButton onClick={() => { history.push(routes.splashscreen.path); }}>
          {t('Go back')}
        </TertiaryButton>
      </div>
    ) : 'jo';
  }
}

export default UnlockDevice;
