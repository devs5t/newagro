/* eslint-disable @typescript-eslint/no-explicit-any */

const BSC_TESTNET = {
  chainId: "0x61",
  chainName: "BSCTESTNET",
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  nativeCurrency: {
    name: "BINANCE COIN",
    symbol: "BNB",
    decimals: 18,
  },
  blockExplorerUrls: ["https://testnet.bscscan.com/"],
};

const BSC_MAINET = {
  chainId: "0x38",
  chainName: "BSCMAINET",
  rpcUrls: ["https://bsc-dataseed1.binance.org"],
  nativeCurrency: {
    name: "BINANCE COIN",
    symbol: "BNB",
    decimals: 18,
  },
  blockExplorerUrls: ["https://testnet.bscscan.com/"],
};

const FANTOM = {
  chainId: "0xFA",
  chainName: "FANTOM",
  rpcUrls: ["https://rpc.ftm.tools"],
  nativeCurrency: {
    name: "FANTOM",
    symbol: "FTM",
    decimals: 18,
  },
  blockExplorerUrls: ["https://ftmscan.com/"],
};

const networkMap = {
  97: BSC_TESTNET,
  56: BSC_MAINET,
  250: FANTOM,
};

/**
 * Agrega/Cambia la red con el chainId recibido.
 *
 * Si recibe el mismo chainId, no hace nada
 *
 * @param id
 */

export function addNetwork(id = 56) {
  const networkData = (networkMap as any)[id];

  // agregar red o cambiar red
  // eslint-disable-next-line no-prototype-builtins
  if (window.hasOwnProperty("ethereum")) {
    return window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: networkData,
    });
  } else {
    return null;
  }
}
