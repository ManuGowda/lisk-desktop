import * as common from 'src/modules/common/mocks';
import * as auth from '@auth/mocks';
import * as blocks from '@block/mocks';
import * as legacy from '@legacy/mocks';
import * as network from '@network/mocks';
import * as tokens from '@token/fungible/mocks';
import * as transaction from '@transaction/mocks';
import * as dposValidators from '@dpos/validator/mocks';

export default [
  ...Object.values(common),
  ...Object.values(auth),
  ...Object.values(blocks),
  ...Object.values(legacy),
  ...Object.values(network),
  ...Object.values(tokens),
  ...Object.values(transaction),
  ...Object.values(dposValidators),
];
