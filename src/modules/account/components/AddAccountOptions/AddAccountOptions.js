/* eslint-disable max-lines */
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DropdownButton from '@theme/DropdownButton';
import grid from 'flexboxgrid/dist/flexboxgrid.css';
import Icon from 'src/theme/Icon';
import { TertiaryButton } from 'src/theme/buttons';
import routes from 'src/routes/routes';
import styles from './AddAccountOptions.css';

const addAccountOptions = (t) => [
  {
    text: t('Secret recovery phrase'),
    iconName: 'secretPassphrase',
    pathname: routes.addAccountBySecretRecovery.path,
  },
  {
    text: t('Restore from backup'),
    iconName: 'accountUpload',
    pathname: routes.addAccountByFile.path,
  },
];

const AddAccountOptionButton = ({ iconName, text, onClick }) => (
  <button data-testid={iconName} onClick={onClick} className={styles.addAccountOptionBtnWrapper}>
    <div>
      <Icon name={iconName} />
    </div>
    <span>{text}</span>
  </button>
);

const AddAccountOptions = () => {
  const history = useHistory();
  const { search } = useLocation();
  const { t } = useTranslation();

  return (
    <>
      <div className={`${styles.container} ${grid.row}`}>
        <div
          className={`${styles.wrapper} ${grid['col-xs-12']} ${grid['col-md-12']} ${grid['col-lg-10']}`}
        >
          <div className={`${styles.titleHolder} ${grid['col-xs-10']}`}>
            <h1>{t('Add your account')}</h1>
            <p>{t('Choose an option to add your account to Lisk wallet.')}</p>
            <div className={styles.selectRowWrapper}>
              {addAccountOptions(t).map(({ text, iconName, pathname }) => (
                <AddAccountOptionButton
                  key={text}
                  text={text}
                  iconName={iconName}
                  onClick={() => history.push({ pathname, search })}
                />
              ))}
            </div>
            <div>
              {t('Don’t have a Lisk account yet?')}{' '}
              <DropdownButton
                className={`${styles.dropdownWrapper} input-with-dropdown-dropdown`}
                buttonClassName={`${styles.inputDropdownButton}`}
                buttonLabel={
                  <span>
                    {t('Create one now')} <Icon name="arrowBlueDown" />{' '}
                  </span>
                }
                size="s"
                ButtonComponent={TertiaryButton}
                align="right"
                showArrow
              >
                <Link to={`${routes.register.path}?strength=${128}`}>12 word passphrase</Link>
                <Link to={`${routes.register.path}?strength=${256}`}>24 word passphrase</Link>
              </DropdownButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAccountOptions;
