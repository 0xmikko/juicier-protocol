// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "./Core.sol";

/**
 * @title ILendingProvider
 * @notice Lending provider interface
 * @author Mikhail Lazarev, github.com/MikaelLazarev
 */
interface ILendingProvider {
  /**
   * @dev Deposit asset to selected lending provider
   */

  function deposit(address _reserve, uint256 _amount) external payable;

  /**
   * @dev Redeem asset to selected lending provider
   */

  function redeemUnderlying(
    address _reserve,
    address payable _user,
    uint256 _amount
  ) external;

  /**
   * @notice Reserves methods
   */

  function getReserves() external returns (address[] memory);

  function getReserveData(address _reserveAddress)
    external
    view
    returns (
      uint256 totalLiquidity,
      uint256 availableLiquidity,
      uint256 totalBorrowsVariable,
      uint256 liquidityRate,
      uint256 variableBorrowRate,
      uint256 utilizationRate,
      uint256 liquidityIndex,
      uint256 variableBorrowIndex,
      address aTokenAddress,
      uint40 lastUpdateTimestamp
    );

  function getReserveLiquidityRate(address _reserveAddress)
    external
    view
    returns (uint256 liquidityRate);

  function getReserveBorrowRate(address _reserveAddress)
    external
    view
    returns (uint256);

  function getAvaibleLiquidity(address _reserve)
    external
    view
    returns (uint256);

  function getReserveManagerForApprove(address _reserve)
    external
    view
    returns (address);
}
