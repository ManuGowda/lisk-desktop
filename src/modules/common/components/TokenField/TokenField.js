import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TokenAmount from '@token/fungible/components/tokenAmount';
import MenuSelect, { MenuItem } from 'src/modules/wallet/components/MenuSelect';
import { useTokensBalance } from '@token/fungible/hooks/queries';
import TokenStyle from './TokenField.css';

// eslint-disable-next-line import/prefer-default-export
export const TokenField = ({ styles, onChange, value }) => {
  const { t } = useTranslation();

  const { data: { data: tokens = [] } = {}, isSuccess } = useTokensBalance();

  useEffect(() => {
    if (tokens.length > 0) {
      onChange(tokens[0]);
    }
  }, [isSuccess]);
  return (
    <div className={`${styles.fieldGroup} token`}>
      <label className={`${styles.fieldLabel}`}>
        <span>{t('Token')}</span>
      </label>
      {value.availableBalance && (
        <span className={styles.balance}>
          {t('Balance')}:&nbsp;&nbsp;
          <span>
            <TokenAmount val={value.availableBalance} token={value.symbol} />
          </span>
        </span>
      )}
      <MenuSelect
        value={value}
        onChange={onChange}
        select={(selectedValue, option) => selectedValue?.name === option.name}
      >
        {tokens.map((tokenValue) => (
          <MenuItem
            className={TokenStyle.chainOptionWrapper}
            value={tokenValue}
            key={tokenValue.name}
          >
            {/* <img className={TokenStyle.chainLogo} src={chainLogo} /> */}
            <span>{tokenValue.name}</span>
          </MenuItem>
        ))}
      </MenuSelect>
    </div>
  );
};
