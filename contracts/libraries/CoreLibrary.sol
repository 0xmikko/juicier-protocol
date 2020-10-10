pragma solidity ^0.6.10;

library CoreLibrary {
    struct ProviderReserveData {
        // reserve total liquidity
        uint256 totalLiquidity;
        //reserve available liquidity for borrowing
        uint256 availableLiquidity;
        //the total borrows of the reserve at a stable rate. Expressed in the currency decimals
        uint256 totalBorrowsStable;
        //the total borrows of the reserve at a variable rate. Expressed in the currency decimals
        uint256 totalBorrowsVariable;
        //the current supply rate. Expressed in ray
        uint256 liquidityRate;
        //current variable rate APY of the reserve pool, in Ray units.
        uint256 variableBorrowRate;
        //current stable rate APY of the reserve pool, in Ray units.
        uint256 stableBorrowRate;
        //current average stable borrow rate
        uint256 averageStableBorrowRate;
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
