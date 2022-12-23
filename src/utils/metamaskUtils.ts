const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string,
  account: string
) => {
  if (account) {
    const tokenAdded = await (window as WindowChain).ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });

    return tokenAdded;
  } else {
    console.debug("No adding token");
  }
};

export default registerToken;
