import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.27",

  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x350c8a8cd26f621f1362bf1ef00cfd6ad2e228bcee1f119ccc8da03444d33847"
      ],
    },
  },
};

export default config;
