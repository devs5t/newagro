/**
 * Agrega/Cambia la red con el chainId recibido.
 *
 * Si recibe el mismo chainId, no hace nada
 *
 * @param id
 */

export async function useAddNetwork(id = 56) {
  let networkData;
  switch (id) {
    //bsctestnet
    case 97:
      networkData = [
        {
          chainId: "0x61",
          chainName: "BSCTESTNET",
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          nativeCurrency: {
            name: "BINANCE COIN",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
        },
      ];
      break;
    //bscmainet
    case 56:
      networkData = [
        {
          chainId: "0x38",
          chainName: "BSCMAINET",
          rpcUrls: ["https://bsc-dataseed1.binance.org"],
          nativeCurrency: {
            name: "BINANCE COIN",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
        },
      ];
      break;
    case 42:
      networkData = [
        {
          chainId: "0x2A",
          chainName: "KOVAN",
          rpcUrls: ["https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
          nativeCurrency: {
            name: "KOVAN",
            symbol: "KETH",
            decimals: 18,
          },
          blockExplorerUrls: ["https://kovan.etherscan.io/"],
        },
      ];
      break;
    //fantom
    case 250:
      networkData = [
        {
          chainId: "0xFA",
          chainName: "FANTOM",
          rpcUrls: ["https://rpc.ftm.tools"],
          nativeCurrency: {
            name: "FANTOM",
            symbol: "FTM",
            decimals: 18,
          },
          blockExplorerUrls: ["https://ftmscan.com/"],
        },
      ];
      break;
    default:
      break;
  }
  // agregar red o cambiar red
  if (window.hasOwnProperty("ethereum")) {
    return window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: networkData,
    });
  } else {
    return null;
  }
}