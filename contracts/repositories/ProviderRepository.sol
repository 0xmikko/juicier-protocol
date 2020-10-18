// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "../core/ILendingProvider.sol";

contract ProviderRepository is Ownable {
  mapping(address => address) providersMap;
  address[] providersList;

  /**
   * @dev emitted on deposit
   * @param _providerAddress the address of the new provider added
   * @param _timestamp the timestamp of the action
   **/
  event NewProvider(address _providerAddress, uint256 _timestamp);

  /**
   * @dev Adds new lending provider to the list
   * throw exception if provider is already exists in the list
   * @param _providerAddress - the address of the provider contract
   */
  modifier providerHasExist(address _providerAddress) {
    require(
      providersMap[_providerAddress] != address(0),
      "ProvidersManager: Provider is not in the list"
    );
    _;
  }

  /**
   * @dev Adds new lending provider to the list
   * throw exception if provider is already exists in the list
   * @param _address - the address of the provider contract
   */
  function addProvider(address _address) public onlyOwner {
    require(
      providersMap[_address] == address(0),
      "ProvidersManager: Provider is already in the list"
    );
    providersMap[_address] = _address;
    providersList.push(_address);

    emit NewProvider(_address, block.timestamp);
  }

  /**
   * @dev Gets provider by it's contract address or fails
   * throw exception if provider is already exists in the list
   * @param _address the address of the provider contract
   * @return -
   */

  function getProviderByAddressOrFail(address _address)
    public
    view
    providerHasExist(_address)
    returns (ILendingProvider)
  {
    return ILendingProvider(providersMap[_address]);
  }

  function getProviderByIndex(uint256 _index)
    public
    view
    returns (ILendingProvider)
  {
    require(
      _index >= 0 && _index < providersList.length,
      "ProviderRepository: index is out of range"
    );
    return ILendingProvider(providersList[_index]);
  }

  function getProvidersQty() external view returns (uint256) {
    return providersList.length;
  }

  function getProvidesList() public view returns (address[] memory) {
    return providersList;
  }
}
