// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "../interfaces/ILendingProvider.sol";

/**
 * @title Lending Protocols Manager
 * @notice Manages connected Lending protocols
 * @author Mikhail Lazarev, github.com/MikaelLazarev
 */

contract ProvidersManager is Ownable {
    mapping(address => address) providers;
    address[] providersList;

    /**
     * @dev Adds new lending provider to the list
     * throw exception if provider is already exists in the list
     * @param _providerAddress - the address of the provider contract
     */
    modifier providerHasExist(address _providerAddress) {
        require(
            providers[_providerAddress] != address(0),
            "Provider is not in the list"
        );
        _;
    }

    /**
     * @dev Adds new lending provider to the list
     * throw exception if provider is already exists in the list
     * @param _providerAddress - the address of the provider contract
     */
    function setProvider(address _providerAddress) public onlyOwner {
        require(
            providers[_providerAddress] == address(0),
            "Provider is already in the list"
        );
        providers[_providerAddress] = _providerAddress;
        providersList.push(_providerAddress);
    }

    /**
     * @dev Gets provider by it's contract address or fails
     * throw exception if provider is already exists in the list
     * @param _providerAddress the address of the provider contract
     * @return -
     */

    function getProviderOrFail(address _providerAddress)
        public
        view
        providerHasExist(_providerAddress)
        returns (ILendingProvider)
    {
        return ILendingProvider(providers[_providerAddress]);
    }
}
