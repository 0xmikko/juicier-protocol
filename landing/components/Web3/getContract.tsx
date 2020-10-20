import Web3 from "web3";

export const getContractInstance = async (
  web3: Web3,
  contractDefinition: any
) => {
  // get network ID and the deployed address
  const networkId = await web3.eth.net.getId();
  const deployedAddress = contractDefinition.networks[networkId].address;

  // create the instance
  const instance = new web3.eth.Contract(
    contractDefinition.abi,
    deployedAddress
  );
  return instance;
};
