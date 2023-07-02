/* eslint-disable max-lines */
const { resolve } = require('path');

module.exports = {
  rootDir: '../',
  modulePaths: ['src/modules'],
  testMatch: [
    '<rootDir>/src/**/*.test.js',
    '<rootDir>/app/src/**/*.test.js',
    '<rootDir>/setup/**/*.test.js',
    '<rootDir>/tests/**/*.test.js',
    '<rootDir>/libs/**/*.test.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/test/integration/wallet.test.js',
    'src/components/login/*.test.js',
    'src/modules/auth/components/Signup/register.test.js',
  ],
  verbose: false,
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^.+\\.css$': 'identity-obj-proxy',
    '^src(.*)$': resolve(__dirname, '../src/$1'),
    '^@scripts(.*)$': resolve(__dirname, '../scripts/$1'),
    '^swiper/css$': resolve(__dirname, '../node_modules/swiper/swiper-bundle.js'),
    '^@setup(.*)$': resolve(__dirname, '../setup/$1'),
    '^@tests(.*)$': resolve(__dirname, '../tests/$1'),
    '^@fixtures(.*)$': resolve(__dirname, '../tests/fixtures/$1'),
    '^@theme(.*)$': resolve(__dirname, '../src/theme/$1'),
    '^@account(.*)$': resolve(__dirname, '../src/modules/account/$1'),
    '^@blockchainApplication(.*)$': resolve(__dirname, '../src/modules/blockchainApplication/$1'),
    '^@block(.*)$': resolve(__dirname, '../src/modules/block/$1'),
    '^@bookmark(.*)$': resolve(__dirname, '../src/modules/bookmark/$1'),
    '^@search(.*)$': resolve(__dirname, '../src/modules/search/$1'),
    '^@common(.*)$': resolve(__dirname, '../src/modules/common/$1'),
    '^@legacy(.*)$': resolve(__dirname, '../src/modules/legacy/$1'),
    '^@message(.*)$': resolve(__dirname, '../src/modules/message/$1'),
    '^@pos(.*)$': resolve(__dirname, '../src/modules/pos/$1'),
    '^@reward(.*)$': resolve(__dirname, '../src/modules/reward/$1'),
    '^@network(.*)$': resolve(__dirname, '../src/modules/network/$1'),
    '^@settings(.*)$': resolve(__dirname, '../src/modules/settings/$1'),
    '^@token(.*)$': resolve(__dirname, '../src/modules/token/$1'),
    '^@auth(.*)$': resolve(__dirname, '../src/modules/auth/$1'),
    '^@wallet/(.*)$': resolve(__dirname, '../src/modules/wallet/$1'),
    '^@transaction(.*)$': resolve(__dirname, '../src/modules/transaction/$1'),
    '^@hardwareWallet(.*)$': resolve(__dirname, '../src/modules/hardwareWallet/$1'),
    '^@update(.*)$': resolve(__dirname, '../src/modules/update/$1'),
    '^@views(.*)$': resolve(__dirname, '../packages/views/$1'),
    '^@packages(.*)$': resolve(__dirname, '../packages/$1'),
    '^@screens(.*)$': resolve(__dirname, '../packages/views/screens/$1'),
    '^@libs(.*)$': resolve(__dirname, '../libs/$1'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
  },
  collectCoverage: true,
  resetModules: true,
  coverageDirectory: '<rootDir>/coverage/jest',
  collectCoverageFrom: [
    'src/**/*.js',
    'setup/**/*.js',
    'app/src/**/*.js',
    '!src/modules/**/mocks/*.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.test.js',
    'app/src/ipc.js',
    'app/src/ledger.js',
    'app/src/utils.js',
    'app/src/hwManager.js',
    'app/src/modules/win.js',
    'app/src/modules/localeHandler.js',
    'app/src/modules/storage.js',
    'src/utils/testHelpers.js',
    'src/auth/const/',
    'src/block/const/',
    'src/pos/validator/consts/',
    'src/settings/const/',
    'src/const',
    'src/modules/token/fungible/consts/',
    'src/settings/const/',
    'scripts/i18n/i18n-scanner.js',
    'setup/react/main.js',
    'tests/tests.js',
    'app/src/modules/autoUpdater.js',
    'src/modules/settings/store/reducer.js',
    'src/modules/bookmark/store/reducer.js',
    'src/modules/network/store/reducer.js',
    'src/modules/network/store/middleware.js',
    'src/modules/wallet/store/middleware.js',
    'src/modules/common/components/customRoute/errorBoundary.js',
    'src/modules/common/components/MultiStep/index.js',
    'src/modules/common/components/OldMultiStep/index.js',
    'src/modules/common/components/MultiStep/Element.js',
    'src/modules/common/components/OldMultiStep/Element.js',
    'src/modules/common/components/MultiStep/utils.js',
    'src/modules/common/components/OldMultiStep/utils.js',
    'src/modules/common/components/MultiStep/Navigator.js',
    'src/modules/common/components/OldMultiStep/Navigator.js',
    'src/modules/common/components/MultiStep/NavigatorButton.js',
    'src/modules/common/components/OldMultiStep/NavigatorButton.js',
    'src/theme/dialog/holder.js',
    'src/theme/dialog/link.js',
    'src/modules/settings/components/networkSelector/networkSelector.js',
    'src/modules/common/components/customRoute/index.js',
    'src/modules/common/components/bars/sideBar/index.js',
    'src/modules/common/components/bars/topBar/navigationButtons.js',
    'src/modules/update/detail/info/newReleaseDialog/index.js',
    'src/modules/transaction/components/TransactionInfo/',
    'src/modules/wallet/components/walletVisualWithAddress/index.js',
    'src/modules/transaction/components/TransactionTypeFigure/TransactionTypeFigure.js',
    'src/modules/common/components/filterDropdownButton/textFilter.js',
    'src/modules/transaction/components/TransactionAmount/TransactionAmount.js',
    'src/modules/transaction/components/TransactionResultList/TransactionResultList.js',
    'src/modules/common/components/bars/topBar/networkName.js',
    'src/modules/wallet/components/multisignatureMembers/index.js',
    'src/modules/pos/validator/components/WarnPunishedValidator/WarnPunishedValidator.js',
    'src/modules/pos/validator/components/WarnPunishedValidator/index.js',
    'src/modules/pos/validator/components/WarnPunishedValidator/StakeWarning.js',
    'src/theme/tabs/tabsContainer/tabsContainer.js',
    'src/modules/common/components/copyToClipboard/index.js',
    'src/theme/tabs/switcher/index.js',
    'src/theme/demo/demo.js',
    'src/modules/common/components/calendar/demo.js',
    'src/modules/common/components/illustration/demo.js',
    'src/modules/wallet/components/PassphraseInput/demo.js',
    'src/theme/Spinner/demo.js',
    'src/theme/tabs/switcher/demo.js',
    'src/theme/demo/demoRenderer.js',
    'src/theme/table/header.js',
    'src/modules/common/components/timestamp/index.js',
    'src/utils/localJSONStorage.js',
    'src/utils/analytics.js',
    'src/modules/bookmark/utils.js',
    'src/theme/Theme.js',
    'src/utils/platform.js',
    'src/modules/wallet/utils/hwManager.js',
    'src/modules/wallet/utils/account.js',
    'src/utils/dateTime.js',
    'src/modules/network/utils/api/index.js',
    'src/utils/login.js',
    'src/modules/transaction/manager/transactionResult.js',
    'src/modules/search/api/index.js',
    'src/modules/settings/components/toggle.js',
    'src/modules/common/components/bars/topBar/tokenSelector.js',
    'src/modules/network/utils/getNetwork.js',
    'src/modules/block/utils/api/getBlocks.js',
    'src/modules/transaction/api/index.js',
    'src/modules/transaction/utils/transaction.js',
    'src/modules/common/components/filterDropdownButton/addressFilter.js',
    'src/modules/transaction/components/TransactionRow/index.js',
    'src/modules/transaction/manager/transactionSummary.js',
    'src/modules/pos/validator/store/reducers/staking.js',
    'src/modules/transaction/components/TransactionResult/illustrationsMap.js',
    'src/modules/transaction/components/Regular/Regular.js',
    'src/utils/withFilters.js',
    'src/modules/token/fungible/components/BalanceInfo/EmptyBalanceTooltipWrapper.js',
    'src/modules/bookmark/components/AddBookmark/AddBookmark.js',
    'src/modules/wallet/utils/api/index.js',
    'src/modules/transaction/utils/hwManager/index.js',
    'src/modules/transaction/utils/transactionDetailsHelper.js',
    'src/modules/transaction/utils/removeDuplicateTransactions.js',
    'src/modules/block/map/blocksFiltersMap.js',
    'src/modules/block/utils/blockSubscribe.js',
    'src/modules/wallet/components/signMultisigView/helpers.js',
    'src/modules/pos/validator/store/actions/staking.js',
    'src/modules/transaction/components/transactionAddress/index.js',
    'src/modules/pos/validator/store/middlewares/staking.js',
    'src/modules/common/components/discreetMode/discreetMode.js',
    'src/modules/transaction/components/TransactionRow/components.js',
    'src/theme/box/row.js',
    'src/modules/token/fungible/components/BalanceInfo/LockedBalanceLink.js',
    'src/modules/settings/components/customNode/readMode.js',
    'src/modules/settings/components/customNode/editMode.js',
    'src/modules/settings/components/customNode/customNode.js',
    'src/modules/auth/components/RecoveryPhrase/index.js',
    'src/modules/transaction/components/TransactionMonitor/TransactionMonitorList.js',
    'src/modules/transaction/store/transactionPriorityReducer.js',
    'src/modules/bookmark/components/BookmarksListModal/BookmarkListModal.js',
    'src/modules/transaction/components/BlockDetailsTransactions/BlockDetailsTransactions.js',
    'src/modules/search/utils/searchUtils.js',
    'src/modules/transaction/components/TransactionDetails/stakes.js',
    'src/modules/transaction/components/TransactionDetails/confirmations.js',
    'src/modules/transaction/components/TransactionDetails/members.js',
    'src/modules/transaction/components/TransactionDetails/nonce.js',
    'src/modules/transaction/components/TransactionDetails/numberOfSignatures.js',
    'src/modules/transaction/components/TransactionDetails/signedAndRemainingMembersList.js',
    'src/modules/settings/hooks/useSettings.js',
    'src/modules/settings/components/currencySelector.js',
    'src/modules/settings/components/SettingDialog/SettingDialog.js',
    'src/modules/legacy/store/action.js',
    'src/modules/transaction/components/Send/Send.js',
    'src/modules/transaction/components/UnlockBalance/UnlockBalance.js',
    'src/modules/pos/validator/components/toggleIcon/index.js',
    'src/modules/common/components/amountField/index.js',
    'src/modules/pos/validator/hooks/useStakeAmountField.js',
    'src/modules/pos/validator/components/StakeForm/StakeRow.js',
    'src/modules/pos/validator/components/StakeForm/EmptyState.js',
    'src/modules/pos/validator/components/RegisterValidatorStatus/Status.js',
    'src/modules/pos/validator/components/UnlockBalanceForm/index.js',
    'src/modules/wallet/components/registerMultisigForm/memberField.js',
    'src/modules/wallet/components/registerMultisigForm/form.js',
    'src/modules/block/components/blockDetails/blockDetails.js',
    'src/modules/block/components/blocks/blockFilterDropdown.js',
    'src/modules/common/components/charts/chartOptions.js',
    'src/modules/common/components/charts/index.js',
    'src/modules/block/components/blocks/blockRow.js',
    'src/modules/block/components/blocks/tableHeader.js',
    'src/modules/block/components/blocks/blocks.js',
    'src/modules/network/utils/helpers.js',
    'src/modules/network/components/map/index.js',
    'src/modules/network/components/statistics/othersTooltip.js',
    'src/modules/network/components/statistics/index.js',
    'src/modules/network/manager/networkManager.js',
    'src/modules/auth/hooks/useCreateAccounts.js',
    'src/modules/common/components/MultiStep/Button.js',
    'src/modules/auth/components/Signup/register.js',
    'src/theme/ProgressCircular/circularProgress.js',
    'src/modules/wallet/utils/signMessage.js',
    'src/modules/message/components/signatureCollector/index.js',
    'src/modules/message/components/signMessageView/index.js',
    'src/modules/transaction/components/Explorer/ExplorerTransactionsHeaderMap.js',
    'src/modules/transaction/components/FilterDropdown/FilterDropdown.js',
    'src/modules/transaction/components/Explorer/ExplorerTransactions.js',
    'src/modules/transaction/manager/explorerManager.js',
    'src/modules/token/fungible/components/SendStatus/Status.js',
    'src/modules/wallet/components/walletInfo/identity.js',
    'src/modules/wallet/components/walletInfo/actionBar.js',
    'src/modules/wallet/components/walletInfo/index.js',
    'src/modules/token/fungible/components/BalanceInfo/index.js',
    'src/modules/transaction/components/WalletTransactions/TransactionHeader.js',
    'src/modules/transaction/components/WalletTransactions/TransactionList.js',
    'src/modules/transaction/components/WalletTransactions/index.js',
    'src/modules/message/components/verifyMessageView/index.js',
    'src/modules/pos/validator/components/UnlockBalanceStatus/UnlockBalanceStatus.js',
    'src/modules/pos/validator/components/UnlockBalanceStatus/index.js',
    'src/modules/pos/validator/components/UnlockBalanceView/index.js',
    'src/modules/pos/validator/utils/getMaxAmount.js',
    'src/modules/pos/validator/manager/editStakeManager.js',
    'src/modules/legacy/components/reclaim/index.js',
    'src/modules/legacy/components/Status/index.js',
    'src/modules/legacy/manager/reclaimBalanceModal.js',
    'src/modules/wallet/components/registerMultisigForm/index.js',
    'src/modules/wallet/components/signMultisigForm/form.js',
    'src/modules/wallet/components/signMultisigForm/index.js',
    'src/modules/wallet/components/signMultisigSummary/footer.js',
    'src/modules/wallet/components/signMultisigSummary/Summary.js',
    'src/modules/wallet/components/signMultisigSummary/index.js',
    'src/modules/wallet/components/signMultisigStatus/index.js',
    'src/modules/wallet/components/multisigAccountDetails/index.js',
    'src/modules/transaction/components/AccountInfo/AccountInfo.js',
    'src/modules/wallet/components/signMultisigStatus/footer.js',
    'src/modules/common/components/charts/utils/balanceChart.js',
    'src/modules/wallet/components/searchBarWallets/passphraseRenderer/index.js',
    'src/modules/wallet/store/middlewares/hwManager.js',
    'src/modules/pos/validator/components/ValidatorProfile/ValidatorStakeButton.js',
    'src/modules/pos/validator/store/middlewares/staking.js',
    'src/modules/transaction/store/transactionPriorityReducer.js',
    'src/modules/pos/validator/store/actions/validator.js',
    'src/modules/token/fungible/components/BalanceInfo/ActionBar.js',
    'src/modules/wallet/manager/multisigAccountDetailsManager.js',
    'app/src/main.js',
    'src/modules/account/hooks/useDecryptionAccount.js',
    'src/redux/selectors.js',
    'src/utils/api/ws.js',
    'src/utils/api/market/index.js',
    'src/modules/auth/components/hwWalletLogin/selectAccount/accountCard.js',
    'src/modules/auth/components/hwWalletLogin/selectAccount/selectAccount.js',
    'src/modules/pos/validator/components/ToggleIcon/index.js',
    'src/modules/pos/validator/components/ValidatorProfile/StakerRow.js',
    'src/modules/auth/components/hwWalletLogin/hwWalletLogin.js',
    'src/modules/pos/validator/components/ValidatorProfile/PerformanceView.js',
    'src/modules/pos/validator/components/ValidatorProfile/DetailsView.js',
    'src/modules/pos/validator/components/ValidatorProfile/ValidatorProfile.js',
    'src/modules/pos/validator/components/ValidatorPerformanceModal/index.js',
    'src/modules/transaction/components/Overview/index.js',
    'src/modules/transaction/components/Transactions/index.js',
    'src/modules/wallet/components/overview/overview.js',
    'src/modules/wallet/components/overview/overviewManager.js',
    'src/modules/wallet/components/request/request.js',
    'src/modules/wallet/components/request/index.js',
    'src/redux/store.js',
    'src/modules/common/components/onboarding/',
    'src/modules/account/components/AccountDetails/AccountOverview/index.js',
    'src/modules/wallet/components/multiSignature/index.js',
    'src/modules/account/hooks/useCurrentAccount.js',
    'src/modules/transaction/store/actions.js',
    'src/modules/transaction/hooks/useCreateTransaction.js',
    'src/modules/transaction/components/TransactionDetails', // @Todo: would resolve this when all transation implementations are finallized
    'libs/hwManager/manufacturers/ledger/index.js', // TODO: To be fixed when HW Manager is refactored
    'src/modules/wallet/utils/hwManager.js', // TODO: To be fixed when HW Manager is refactored
    'src/modules/auth/components/hwWalletLogin/selectAccount/selectAccount.js', // TODO: To be fixed when HW Manager is refactored
    'src/modules/auth/components/hwWalletLogin/selectAccount/accountCard.js', // TODO: To be fixed when HW Manager is refactored
    'src/modules/wallet/store/action.js', // TODO: To be fixed when HW Manager is refactored
    'src/modules/hardwareWallet/manager/HWClient.js', // TODO: To be fixed when HW Manager is refactored
    'src/utils/immutableUtils.js', // TODO: To be fixed in PDD-1482
    'src/utils/useOutsideClickListener.js',
    'src/utils/usePrevious.js', // TODO: To be fixed in PDD-1482
    'src/modules/hardwareWallet/store/actions/devicesActions.js', // TODO: To be fixed in PDD-1482
    'src/modules/hardwareWallet/utils/getHWAccounts.js', // TODO: To be fixed in PDD-1482
    'src/modules/hardwareWallet/hooks/useHWAccounts.js', // TODO: To be fixed in PDD-1482
    'src/modules/hardwareWallet/components/SelectHardwareDeviceModal/components/HwDeviceItem.js', // TODO: To be fixed in PDD-1482
    'src/modules/hardwareWallet/store/reducers/devicesReducer.js', // TODO: To be fixed in PDD-1482
    'src/modules/hardwareWallet/components/DeviceToast/DeviceToast.js', // TODO: To be fixed in PDD-1482
    'src/modules/hardwareWallet/components/HardwareWalletStatus/HardwareWalletStatus.js', // TODO: To be fixed in PDD-1482
    'src/modules/account/components/AccountRow/AccountRow.js', // TODO: To be fixed in PDD-1482
    'src/modules/account/components/ManageAccounts/ManageAccounts.js', // TODO: To be fixed in PDD-1482
    'src/modules/account/components/SwitchAccount/SwitchAccount.js', // TODO: To be fixed in PDD-1482
    'src/modules/account/components/RemoveSelectedAccountFlow/RemoveSelectedAccountFlow.js',
    'src/modules/blockchainApplication/connection/components/RequestView/RequestView.js', // TODO: To be fixed in PDD-1482
    'src/modules/hardwareWallet/store/actions/devicesActions.js', // TODO: To be fixed in PDD-1482
    '/src/modules/hardwareWallet/store/reducers/devicesReducer.js', // TODO: To be fixed in PDD-1482
    'src/modules/pos/validator/components/ClaimRewardsView/index.js',
    'src/modules/blockchainApplication/manage/hooks/useApplicationManagement.js', // TODO: To be fixed in PDD-1522
    'src/modules/wallet/components/MenuSelect/MenuSelect.js', // TODO: To be fixed in PDD-1522
    'src/modules/network/components/networkSwitcherDropdown/NetworkSwitcherDropdown.js', // TODO: To be fixed in PDD-1522
    'src/modules/blockchainApplication/manage/components/UserApplicationSelector/UserApplicationSelector.js', // TODO: To be fixed in PDD-1522
    'src/modules/network/components/selectNetwork/SelectNetwork.js', // TODO: To be fixed in PDD-1522
    'src/modules/blockchainApplication/manage/components/NetworkApplicationDropDownButton/NetworkApplicationDropDownButton.js', // TODO: To be fixed in PDD-1522
  ],
  coverageThreshold: {
    // global: {
    //   branches: 90,
    //   functions: 90,
    //   lines: 90,
    //   statements: 90,
    // },
    'app/src/**/*.js': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'src/**/*.js': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'src/**/store/**/*.js': {
      statements: 90,
    },
  },
  setupFiles: ['<rootDir>/setup/config/setupJest.js', 'jest-canvas-mock'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '^.+\\.svg|png|jpg|jpeg$': '<rootDir>/tests/__mocks__/imageTransform.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(yup|@hookform/resolvers|swiper|ssr-window|dom7)/)'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  globals: {
    PRODUCTION: true,
    TEST: true,
    VERSION: '',
  },
  coverageReporters: process.env.ON_JENKINS ? ['text', 'lcov', 'cobertura'] : ['html', 'json'],
  reporters: [
    'default',
    ['jest-junit', { suiteName: 'jest tests', outputDirectory: '<rootDir>/coverage/jest' }],
  ],
  setupFilesAfterEnv: [
    './setup/config/setupJestAfterEnv',
    './node_modules/@testing-library/jest-dom/extend-expect',
    './node_modules/jest-enzyme/lib/index.js',
  ],
  watchPlugins: [
    ['jest-watch-toggle-config', { setting: 'verbose' }],
    ['jest-watch-toggle-config', { setting: 'collectCoverage' }],
    'jest-watch-typeahead/filename',
  ],
};
