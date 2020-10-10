// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../libraries/CoreLibrary.sol";

/**
 * @dev Interface of the Lending Provider
 */
interface ILendingProvider {
    /**
     * @dev Deposit asset to selected lending provider
     */

    function deposit(address _reserve, uint256 _amount)
        external
        payable
        returns (uint256);

    function withdraw(address _reserve, uint256 _amount) external;

    /**
     * @notice Resereves methods
     */

    function getReserves() external returns (address[] memory);

    function getReserveData(address _reserveAddress)
        external
        view
        returns (
            uint256 totalLiquidity,
            uint256 availableLiquidity,
            uint256 totalBorrowsStable,
            uint256 totalBorrowsVariable,
            uint256 liquidityRate,
            uint256 variableBorrowRate,
            uint256 stableBorrowRate,
            uint256 averageStableBorrowRate,
            uint256 utilizationRate,
            uint256 liquidityIndex,
            uint256 variableBorrowIndex,
            address aTokenAddress,
            uint40 lastUpdateTimestamp
        );
}
