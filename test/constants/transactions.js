const transaction = index => ({
  // height: 9381199 + index,
  // blockId: `35335302495521273${index}`,
  // title: 'transfer',
  // amount: `${index}00000000`,
  id: `1402835196409030464${index}`,
  type: 0,
  moduleAssetId: '2:0',
  fee: '10000000',
  isPending: false,
  sender: { address: 'lskdwsyfmcko6mcd357446yatromr9vzgu7eb8y11' },
  asset: {
    amount: '200',
    recipientAddress: 'lskdwsyfmcko6mcd357446yatromr9vzgu7eb8y22',
    data: 'test',
  },
  block: {
    timestamp: 106359314,
    height: 9381199 + index,
  },
  confirmations: 98 + index,
  signature: 'bbd659c908a609e27b491aeb429038fa8638b7eaed357043e5fbd463658caf7e9777b8b53f3d5e3ef4b6280e55d264b30162319eee24c3844c7c65974200ed00',
  signatures: [],
});

const transactions = Array(30).fill(1).map((item, index) => transaction(index));

const sampleTransaction = {
  moduleID: 5,
  assetID: 1,
  senderPublicKey: '205688492bc52ddabfdc10fa7728b8bcb5942ad17c68ab5c20e96153fd1ac657',
  nonce: '2n',
  fee: '142000n',
  signatures: [
    '4bfc0ab5e1b3c3fb1ca7362acc917775ce6345f26a261d592d83c62ad156e90221269a3b423516c2b84c1ebdd285d3bf83be688f5a158c1daf7245fecea0350a',
  ],
  asset: {
    votes: [
      {
        amount: '2000000000n',
        delegateAddress: 'b9c228bae5f9a6f8a0bd7787b4c123bf1de4bedd',
      },
    ],
  },
  id: 'ad0e0acbe8a3ece3087c8362149ca39c470e565d268df32e57de5d3fe2e1ea5c',
};

const transformedAccountTransaction = {
  moduleAssetId: '5:1',
  id: 'ad0e0acbe8a3ece3087c8362149ca39c470e565d268df32e57de5d3fe2e1ea5c',
  fee: '142000n',
  nonce: '2n',
  signatures: [
    '4bfc0ab5e1b3c3fb1ca7362acc917775ce6345f26a261d592d83c62ad156e90221269a3b423516c2b84c1ebdd285d3bf83be688f5a158c1daf7245fecea0350a',
  ],
  sender: {
    address: 'lsks6uckwnap7s72ov3edddwgxab5e89t6uy8gjt6',
    publicKey: '205688492bc52ddabfdc10fa7728b8bcb5942ad17c68ab5c20e96153fd1ac657',
  },
};

const newTransaction = {
  pending: [],
  confirmed: [],
  count: null,
  filters: {
    dateFrom: '',
    dateTo: '',
    amountFrom: '',
    amountTo: '',
    message: '',
  },
  signedTransaction: {
    id: 1,
    asset: {
      amount: 112300000,
    },
    fee: 0.00012451,
  },
  txSignatureError: null,
  txBroadcastError: null,
};

export { sampleTransaction, transformedAccountTransaction, newTransaction };

export default transactions;
