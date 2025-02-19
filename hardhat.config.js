require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      accounts: [
        {
          // Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
          privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
          balance: "1001234567890123456" // ~1.0012 ETH
        },
        {
          // Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
          privateKey: "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
          balance: "998765432109876543" // ~0.9987 ETH
        },
        {
          // Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
          privateKey: "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
          balance: "1002345678901234567" // ~1.0023 ETH
        },
        {
          // Account #3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906
          privateKey: "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
          balance: "999876543210987654" // ~0.9998 ETH
        },
        {
          // Account #4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65
          privateKey: "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a",
          balance: "1003456789012345678" // ~1.0034 ETH
        },
        {
          // Account #5: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc
          privateKey: "0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba",
          balance: "573876543210389621" // ~0.5738 ETH
        }
      ]
    }
  }
};
