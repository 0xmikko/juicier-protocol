// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.10;

/**
 * @dev Interface of the Lending Provider
 */
interface ILendingProvider {
    /**
     * @dev Deposit asset to selected lending provider
     */

    function deposit(address _reserve, uint256 _amount)
        payable external
        returns (uint256);

    function withdraw(address _reserve, uint256 _amount) external;
}
