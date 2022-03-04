/**
 * Agrega/Cambia la red con el chainId recibido.
 *
 * Si recibe el mismo chainId, no hace nada
 *
 * @param id
 */

export async function useAddNetwork(id = 56) {
  let networkData;
  let method = 'wallet_addEthereumChain';
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
      method = 'wallet_switchEthereumChain';
      networkData = [{chainId: "0x2A"}];
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

    console.log(method)
    return window.ethereum.request({
      method,
      params: networkData,
    });
  } else {
    return null;
  }
}