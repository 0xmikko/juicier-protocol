// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "../lib/AddressStorage.sol";

contract AddressRepository is Ownable, AddressStorage {
  bytes32 private constant POOL = "POOL";
  bytes32 private constant PROVIDER_REPOSITORY = "PROVIDER_REPOSITORY";
  bytes32 private constant PROVIDER_SERVICE = "PROVIDER_SERVICE";
  bytes32 private constant RESERVE_REPOSITORY = "RESERVE_REPOSITORY";

  /**
   * @dev returns the address of the LendingPool proxy
   * @return the lending pool proxy address
   **/
  function getPool() public view returns (address) {
    return getAddress(POOL);
  }

  function getProviderRepository() public view returns (address) {
    return getAddress(PROVIDER_REPOSITORY);
  }

  function getProviderService() public view returns (address) {
    return getAddress(PROVIDER_SERVICE);
  }
}
