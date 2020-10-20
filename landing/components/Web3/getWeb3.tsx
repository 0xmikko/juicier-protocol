import Web3 from "web3";

declare global {
  interface Window {
    web3: Web3;
    ethereum: any;
  }
}

export function getWeb3(): Web3 | null {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return window.web3;
  }
  return null;
}
