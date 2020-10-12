pragma solidity ^0.6.10;

import "../providers/aave-protocol/ILendingPool.sol";
import "../libraries/CoreLibrary.sol";

contract AaveLandingPoolMock is ILendingPool {
    address[] private reserves;
    mapping(address => CoreLibrary.ProviderReserveData) reserveData;

    function addReserve(
        address _reserveAddress,
        // reserve total liquidity
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
        uint40 _lastUpdateTimestamp
    ) external {
        reserves.push(_reserveAddress);
        setReserveData(
            _reserveAddress,
            _totalLiquidity,
            _availableLiquidity,
            _totalBorrowsStable,
            _totalBorrowsVariable,
            _liquidityRate,
            _variableBorrowRate,
            _stableBorrowRate,
            _averageStableBorrowRate,
            _lastUpdateTimestamp
        );

        setReserveDataAdditional(
            _reserveAddress,
            _utilizationRate,
            _liquidityIndex,
            _variableBorrowIndex,
            _aTokenAddress,
            _lastUpdateTimestamp
        );
    }

    function setReserveData(
        address _reserveAddress,
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
        uint256 _stableBorrowRate,
        //current average stable borrow rate
        uint256 _averageStableBorrowRate,
        uint40 _lastUpdateTimestamp
    ) internal {

            CoreLibrary.ProviderReserveData storage reserve
         = reserveData[_reserveAddress];
        reserve.totalLiquidity = _totalLiquidity;
        reserve.availableLiquidity = _availableLiquidity;
        reserve.totalBorrowsStable = _totalBorrowsStable;
        reserve.totalBorrowsVariable = _totalBorrowsVariable;
        reserve.liquidityRate = _liquidityRate;
        reserve.variableBorrowRate = _variableBorrowRate;
        reserve.stableBorrowRate = _stableBorrowRate;
        reserve.averageStableBorrowRate = _averageStableBorrowRate;
        reserve.lastUpdateTimestamp = _lastUpdateTimestamp;
    }

    function setReserveDataAdditional(
        address _reserveAddress,
        // expressed as total borrows/total liquidity.
        uint256 _utilizationRate,
        // cumulative liquidity index
        uint256 _liquidityIndex,
        // cumulative variable borrow index
        uint256 _variableBorrowIndex,
        // aTokens contract address for the specific _reserve
        address _aTokenAddress,
        // timestamp of the last update of reserve data
        uint40 _lastUpdateTimestamp
    ) internal {

            CoreLibrary.ProviderReserveData storage reserve
         = reserveData[_reserveAddress];
        reserve.utilizationRate = _utilizationRate;
        reserve.liquidityIndex = _liquidityIndex;
        reserve.variableBorrowIndex = _variableBorrowIndex;
        reserve.aTokenAddress = _aTokenAddress;

        reserve.lastUpdateTimestamp = _lastUpdateTimestamp;
    }

    function deposit(
        address _reserve,
        uint256 _amount,
        uint16 _referralCode
    ) external override payable {}

    function getReserves() external override view returns (address[] memory) {
        return reserves;
    }

    function getReserveData(address _reserveAddress)
        external
        override
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
        )
    {
        totalLiquidity = reserveData[_reserveAddress].totalLiquidity;
        availableLiquidity = reserveData[_reserveAddress].availableLiquidity;
        totalBorrowsStable = reserveData[_reserveAddress].totalBorrowsStable;
        totalBorrowsVariable = reserveData[_reserveAddress]
            .totalBorrowsVariable;
        liquidityRate = reserveData[_reserveAddress].liquidityRate;
        variableBorrowRate = reserveData[_reserveAddress].variableBorrowRate;
        stableBorrowRate = reserveData[_reserveAddress].stableBorrowRate;
        averageStableBorrowRate = reserveData[_reserveAddress]
            .averageStableBorrowRate;
        utilizationRate = reserveData[_reserveAddress].utilizationRate;
        liquidityIndex = reserveData[_reserveAddress].liquidityIndex;
        variableBorrowIndex = reserveData[_reserveAddress].variableBorrowIndex;
        aTokenAddress = reserveData[_reserveAddress].aTokenAddress;
        lastUpdateTimestamp = reserveData[_reserveAddress].lastUpdateTimestamp;
    }
}
