import Web3 from 'web3';

export async function getContract(web3: Web3, artifact: any, address?: string) {
  const networkId = await web3.eth.net.getId();
  const deployedAddress = address || artifact.networks[networkId]?.address;

  // create the instance
  return new web3.eth.Contract(artifact.abi, deployedAddress);
}
