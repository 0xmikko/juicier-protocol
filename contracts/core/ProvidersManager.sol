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
            providers[_providerAddress] != address(0),
            "ProvidersManager: Provider is not in the list"
        );
        _;
    }

    modifier providersListIsNotEmpy() {
        require(
            providersList.length > 0,
            "ProvidersManager: providers list is empty!"
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
            "ProvidersManager: Provider is already in the list"
        );
        providers[_providerAddress] = _providerAddress;
        providersList.push(_providerAddress);

        emit NewProvider(_providerAddress, block.timestamp);
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

    function getProvidesList() public view returns (address[] memory) {
        return providersList;
    }

    function getProviderWithHighestLiquidityRate(address _reserveAddress)
        external
        view
        providersListIsNotEmpy
        returns (address)
    {
        uint256 providerListLenght = providersList.length;
        address result = providersList[0];
        uint256 liquidityRate = 0;

        for (uint256 i = 0; i < providerListLenght; i++) {
            ILendingProvider curProvider = ILendingProvider(providersList[i]);
            uint256 curLiquidityRate = curProvider.getReserveLiquidityRate(
                _reserveAddress
            );
            if (curLiquidityRate > liquidityRate) {
                result = providersList[i];
                liquidityRate = curLiquidityRate;
            }
        }
        return result;
    }

    function getProviderWithLowestLiquidityRate(address _reserveAddress)
        external
        view
        providersListIsNotEmpy
        returns (address provider, uint256 availableLiquidity)
    {
        uint256 providerListLenght = providersList.length;
        provider = providersList[0];
        uint256 liquidityRate = uint256(-1);
        availableLiquidity = 0;

        for (uint256 i = 0; i < providerListLenght; i++) {
            ILendingProvider curProvider = ILendingProvider(providersList[i]);
            uint256 curLiquidityRate = curProvider.getReserveLiquidityRate(
                _reserveAddress
            );

            // If we found lower rate
            if (curLiquidityRate < liquidityRate) {
                // check how much liquidity provider has
                uint256 curAvaibleLiquidity = curProvider.getAvaibleLiquidity(
                    _reserveAddress
                );

                // if liquidity > 0, set it as result provider till we do not find better one
                if (curAvaibleLiquidity > 0) {
                    provider = providersList[i];
                    availableLiquidity = curAvaibleLiquidity;
                    liquidityRate = curLiquidityRate;
                }
            }
        }
    }

    function getAvaibleLiquidity(address _reserveAddress)
        external
        view
        providersListIsNotEmpy
        returns (uint256)
    {
        uint256 availableLiquidity = 0;
        uint256 providerListLenght = providersList.length;
        for (uint256 i = 0; i < providerListLenght; i++) {
            ILendingProvider curProvider = ILendingProvider(providersList[i]);
            availableLiquidity += curProvider.getAvaibleLiquidity(
                _reserveAddress
            );
        }
        return availableLiquidity;
    }
}
