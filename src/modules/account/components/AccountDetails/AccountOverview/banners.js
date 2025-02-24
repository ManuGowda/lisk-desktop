// istanbul ignore file
import routes from 'src/routes/routes';

const banners = [
  {
    infoMessage: (t) => t('Introducing account management'),
    infoDescription: (t) =>
      t(
        'Effortlessly manage multiple accounts in one interface with enhanced privacy and security. Seamlessly switch between accounts, allocate funds, and monitor balances.'
      ),
    illustrationName: 'accountManagement',
    infoLink: routes.wallet.path,
    infoLinkText: 'Explore',
  },
  {
    infoMessage: (t) => t('Introducing blockchain application exploring and management'),
    infoDescription: (t) =>
      t(
        'A new management feature allows you to seamlessly add and switch between applications. The dedicated application tab provides a comprehensive overview of registered, active, and terminated blockchain applications, and statistics.'
      ),
    illustrationName: 'applicationManagement',
    infoLink: routes.blockchainApplications.path,
    infoLinkText: 'Explore',
  },
  {
    infoMessage: (t) => t('Introducing hardware wallet management'),
    infoDescription: (t) =>
      t(
        'Explore multiple hardware wallet devices simultaneously. Seamlessly access your accounts through the integrated functionality of our new account management feature.'
      ),
    illustrationName: 'hardwareWalletManagement',
    infoLink: routes.wallet.path,
    infoLinkText: 'Explore',
  },
  {
    infoMessage: (t) => t('Introducing wallet connect management and exploring'),
    infoDescription: (t) =>
      t(
        'Enjoy a streamlined and secure experience of signing transactions for external applications. Unlock a world of possibilities with Wallet Connect Integration, and take full control of your digital assets.'
      ),
    illustrationName: 'walletConnect',
    infoLink: `${routes.blockchainApplications.path}?tab=SessionManager`,
    infoLinkText: 'Explore',
  },
  {
    infoMessage: (t) => t('Introducing events'),
    infoDescription: (t) =>
      t(
        'Stay informed in real-time about crucial blockchain activities. With this new feature, track the end to end execution and its results for all transactions and blocks.'
      ),
    illustrationName: 'transactionEvents',
    infoLink: routes.wallet.path,
    infoLinkText: 'Explore',
  },
  {
    infoMessage: (t) => t('Introducing Multi-tokens'),
    infoDescription: (t) =>
      t(
        'With Lisk interoperability, you can now store, manage, and transact with a variety of tokens within a single wallet interface. Seamlessly switch between different digital assets and diversify your portfolio effortlessly. Enjoy the convenience and flexibility of Multi-Tokens.'
      ),
    illustrationName: 'multiTokenBalances',
    infoLink: routes.allTokens.path,
    infoLinkText: 'Explore',
  },
  {
    infoMessage: (t) => t('Introducing sending and requesting token within an application'),
    infoDescription: (t) =>
      t(
        'Flawlessly move your assets within a specific blockchain application. Experience the power of cross-chain transfers, enabling you to expand your reach and optimize your asset management strategies.'
      ),
    illustrationName: 'crossApplicationsSendRequestTokens',
  },
  {
    infoMessage: (t) => t('Introducing sending and requesting token across applications'),
    infoDescription: (t) =>
      t(
        'Flawlessly move your assets across different blockchain applications. Experience the power of cross-chain transfers, enabling you to expand your reach and optimize your asset management strategies.'
      ),
    illustrationName: 'withinAndCrossApplicationsSendRequestTokens',
  },
  {
    infoMessage: (t) => t('Introducing Network and Application management'),
    infoDescription: (t) =>
      t(
        'Take control of your blockchain network settings. Now you can customize your network preferences according to your specific needs.'
      ),
    illustrationName: 'networkManagement',
    infoLink: `${routes.wallet.path}?modal=manageApplications`,
    infoLinkText: 'Explore',
  },
  {
    infoMessage: (t) => t('Introducing proof of stake'),
    infoDescription: (t) =>
      t(
        'Enhancing the blockchain consensus mechanism with PoS, and providing increased decentralization, scalability, and energy efficiency, empowering users to participate in securing the network, and earning rewards based on their token holdings.'
      ),
    illustrationName: 'proofOfStake',
    infoLink: routes.validators.path,
    infoLinkText: 'Explore',
  },
];

export default banners;
