import { Interface } from "@ethersproject/abi";
import MultiCallAbi from "src/config/abi/Multicall.json";
import { getMulticallAddress } from "src/utils/addressHelpers";
import { getWeb3NoAccount } from "src/utils/web3";
import { AbiItem } from "web3-utils";

interface Call {
  address: string; // Address of the contract
  name: string; // Function name on the contract (exemple: balanceOf)
  params?: any[]; // Function params
}

const multicall = async (abi: any[], calls: Call[]) => {
  const web3 = getWeb3NoAccount();
  const multi = new web3.eth.Contract(
    MultiCallAbi as unknown as AbiItem,
    getMulticallAddress()
  );
  const itf = new Interface(abi);

  const calldata = calls.map((call) => [
    call.address.toLowerCase(),
    itf.encodeFunctionData(call.name, call.params),
  ]);
  const { returnData } = await multi.methods.aggregate(calldata).call();

  const res = returnData.map((call: any, i: any) =>
    itf.decodeFunctionResult(calls[i].name, call)
  );

  return res;
};

export default multicall;
