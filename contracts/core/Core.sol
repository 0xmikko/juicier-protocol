// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

library Core {
  struct PoolReserveData {
    // reserve total liquidity
    uint256 totalLiquidity;
    //reserve available liquidity for borrowing
    uint256 availableLiquidity;
    //the total borrows of the reserve at a variable rate. Expressed in the currency decimals
    uint256 totalBorrows;
    //the current supply rate. Expressed in ray
    uint256 liquidityRate;
    //current variable rate APY of the reserve pool, in Ray units.
    uint256 variableBorrowRate;
    //current stable rate APY of the reserve pool, in Ray units.
    uint256 utilizationRate;
    // cumulative liquidity index
    uint256 liquidityIndex;
    // cumulative variable borrow index
    uint256 variableBorrowIndex;
    // aTokens contract address for the specific _reserve
    address jTokenAddress;
    // timestamp of the last update of reserve data
    uint40 lastUpdateTimestamp;
  }

  struct ProviderReserveData {
    // reserve total liquidity
    uint256 totalLiquidity;
    //reserve available liquidity for borrowing
    uint256 availableLiquidity;
    // managed by protocol liquidity
    uint256 managedLiquidity;
    //the total borrows of the reserve at a stable rate. Expressed in the currency decimals
    uint256 totalBorrowsVariable;
    //the current supply rate. Expressed in ray
    uint256 liquidityRate;
    //current variable rate APY of the reserve pool, in Ray units.
    uint256 variableBorrowRate;
    // expressed as total borrows/total liquidity.
    uint256 utilizationRate;
    // cumulative liquidity index
    uint256 liquidityIndex;
    // cumulative variable borrow index
    uint256 variableBorrowIndex;
    // aTokens contract address for the specific _reserve
    address aTokenAddress;
    // timestamp of the last update of reserve data
    uint40 lastUpdateTimestamp;
  }
}
