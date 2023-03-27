// Password is "DeykUBjUn7uZHYv!"
const accountsJSON =
  '{"encryptedPassphrase":{"ciphertext":"23c6b342d2b6ae9eab90ddc3cbabdbbacd724a4cb63bc03815aaeff8e0845feece055db7cc6b0e2209cdfdf084915f1bbbb357b103fb2c75247c2ebb44878b253afd1bf963431c371792f8be894f8ac92cd7aa8966bb1e06d2cbc20b85d49300af7bdb92c42d4713f9dbe2c11500bb87cae58fb76cf7ea4c4e77a38fc2273d388521d4990fd264da8e67ec76e8e7e1cef6cac0d4c2dc796dfda835d9f2d59260d1c011a1078bef5f351d2713b064f334be0de4e9d211d5d00d6bc64bba9b78458b24ba0f1a86bdfa7cdd8f30aa66d5b883db4fb8c861e41a7ccf22ad5f34ce9e3fb0ed76c6c694ff40ec1a26b1ed5da92474","mac":"67cd117009729ec7659d2635f25c975fd2d12a6c7c577e092e30d8af9e0e1568","kdf":"argon2id","kdfparams":{"parallelism":4,"iterations":1,"memorySize":2024,"salt":"624fb8a44ec39042651f4218140889e2"},"cipher":"aes-256-gcm","cipherparams":{"iv":"d0c88372f4e34d40492b5ced","tag":"1a283c8a52548c8b82b63509912cf978"},"version":"1"},"metadata":{"name":"aaaaaa","pubkey":"cf434a889d6c7a064e8de61bb01759a76f585e5ff45a78ba8126ca332601f535","path":"m/44\'/134\'/0\'","address":"lsk3ay4z7wqjczbo5ogcqxgxx23xyacxmycwxfh4d","creationTime":"2022-10-04T13:35:32.773Z"},"version":1}';
const accountsTwoJSON =
  '{"encryptedPassphrase":{"ciphertext":"f0f8dd2c51bb46cd90b79dbaee8dded96dd8eff087a58bce4a1e2bb92ee178e9653a885ad14093d231747a659ef462dc5dcfec4b0b47a5fb5c680c4c74ce5c3c8b78bd78fa555fc525d01bca568cd52482957f84816b781c40741c6fb40e6c3aed66e513f16ff1707a2a6840362fa8beac7b3ad74edeb87659a2ee9f40050b352a7323fdc33407cfca2fb4f1c1566c5f7847335ec57ed1bd041e0f40c32866ba850135a679a3226bccaba74745ea9bd0d95cce4c42833def843a19f689b23d85d46adcf0118460d221238292c582ce86f00b8670a36215199a3acb0776cc03d0c4796cceadbd53bbaa5bef2b2fe53d72808a850b","mac":"5a3c49119fcae96adca7d52d2166560bb8e16f391eab8abef2e697008bc90774","kdf":"argon2id","kdfparams":{"parallelism":4,"iterations":1,"memorySize":2024,"salt":"8278f8c93a358d67e49b20bea38d5517"},"cipher":"aes-256-gcm","cipherparams":{"iv":"73d03fbe5079aa8bda42d561","tag":"e9bf1b0d35db3acdf02dea02ec34d407"},"version":"1"},"metadata":{"name":"9876","pubkey":"a2f860e484144dce56dc426bd962044428c7074724b289cd2a23b32e62da02c4","path":"m/44\'/134\'/0\'","address":"lskqw2b528hc6ud7y56toq3kmaq6kj2fpvf9amvtx","creationTime":"2022-11-16T14:07:42.485Z"},"version":1}';
const savedAccounts = [JSON.parse(accountsJSON), JSON.parse(accountsTwoJSON)];

export default savedAccounts;
