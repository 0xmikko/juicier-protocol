pragma solidity ^0.6.10;

import "../providers/aave-protocol/ILendingPool.sol";
import "../libraries/CoreLibrary.sol";

contract AaveLandingPoolMock is ILendingPool {

    address private reserves[];
    mapping(address => ProviderReserveData)

    function addReserve(address _reserveAddress, // reserve total liquidity
uint256 _totalLiquidity,
//reserve available liquidity for borrowing
uint256 _availableLiquidity,
//the total borrows of the reserve at a stable rate. Expressed in the currency decimals
uint256 _totalBorrowsStable,
//the total borrows of the reserve at a variable rate. Expressed in the currency decimals
uint256 _totalBorrowsVariable,
//the current supply rate. Expressed in ray
uint256 _liquidityRate,
//current variable rate APY of the reserve pool, in Ray units.
uint256 _variableBorrowRate,
//current stable rate APY of the reserve pool, in Ray units.
uint256 _stableBorrowRate,
//current average stable borrow rate
uint256 _averageStableBorrowRate,
// expressed as total borrows/total liquidity.
uint256 _utilizationRate,
// cumulative liquidity index
uint256 _liquidityIndex,
// cumulative variable borrow index
uint256 _variableBorrowIndex,
// aTokens contract address for the specific _reserve
address _aTokenAddress,
// timestamp of the last update of reserve data
uint40 _lastUpdateTimestamp) public {
    reserves.
}


    function deposit(
        address _reserve,
        uint256 _amount,
        uint16 _referralCode
    ) external payable {}


}
