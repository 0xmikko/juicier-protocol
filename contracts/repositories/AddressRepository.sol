// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "../lib/AddressStorage.sol";

/**
 * @title AddressRepository
 * @notice Stores addresses of deployed contracts
 * @author Mikhail Lazarev, github.com/MikaelLazarev
 */
contract AddressRepository is Ownable, AddressStorage {
  bytes32 private constant POOL_SERVICE = "POOL_SERVICE";

  bytes32 private constant PROVIDER_REPOSITORY = "PROVIDER_REPOSITORY";
  bytes32 private constant PROVIDER_SERVICE = "PROVIDER_SERVICE";

  bytes32 private constant RESERVE_REPOSITORY = "RESERVE_REPOSITORY";
  bytes32 private constant USER_BALANCE_REPOSITORY = "USER_BALANCE_REPOSITORY";

  bytes32 private constant PRICE_REPOSITORY = "PRICE_REPOSITORY";

  bytes32 private constant RISK_SERVICE = "RISK_SERVICE";
  /**
   * @dev returns the address of the LendingPool proxy
   * @return the lending pool proxy address
   **/
  function getPoolService() public view returns (address) {
    return getAddress(POOL_SERVICE);
  }

  function setPoolService(address _address) public onlyOwner {
    _setAddress(POOL_SERVICE, _address);
  }

  function getProviderRepository() public view returns (address) {
    return getAddress(PROVIDER_REPOSITORY);
  }

  function setProviderRepository(address _address) public onlyOwner {
    _setAddress(PROVIDER_REPOSITORY, _address);
  }

  function getProviderService() public view returns (address) {
    return getAddress(PROVIDER_SERVICE);
  }

  function setProviderService(address _address) public onlyOwner {
    _setAddress(PROVIDER_SERVICE, _address);
  }

  function getReserveRepository() public view returns (address) {
    return getAddress(RESERVE_REPOSITORY);
  }

  function setReserveRepository(address _address) public onlyOwner {
    _setAddress(RESERVE_REPOSITORY, _address);
  }

  function getUserBalanceRepository() public view returns (address) {
    return getAddress(USER_BALANCE_REPOSITORY);
  }

  function setUserBalanceRepository(address _address) public onlyOwner {
    _setAddress(USER_BALANCE_REPOSITORY, _address);
  }

  function getPriceRepository() public view returns (address) {
    return getAddress(PRICE_REPOSITORY);
  }

  function setPriceRepository(address _address) public onlyOwner {
    _setAddress(PRICE_REPOSITORY, _address);
  }


  function getRiskService() public view returns (address) {
    return getAddress(RISK_SERVICE);
  }

  function setRiskService(address _address) public onlyOwner {
    _setAddress(RISK_SERVICE, _address);
  }
}
