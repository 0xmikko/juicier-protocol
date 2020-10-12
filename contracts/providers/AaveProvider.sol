// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

// Import interface for ERC20 standard
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

import "../libraries/CoreLibrary.sol";

import "./AbstractProvider.sol";
import "./aave-protocol/ILendingPool.sol";
import "./aave-protocol/ILendingPoolCore.sol";

contract AaveProvider is AbstractProvider("Aave") {
    address private lendingPoolAddress;
    address private lendingPoolCoreAddress;

    constructor(address _lendingPoolAddress, address _lendingPoolCoreAddress)
        public
    {
        lendingPoolAddress = _lendingPoolAddress;
        lendingPoolCoreAddress = _lendingPoolCoreAddress;
    }

    function deposit(address _reserve, uint256 _amount)
        external
        override
        payable
    {
        // Input variables
        address daiAddress = address(
            0x6B175474E89094C44Da98b954EedeAC495271d0F
        ); // mainnet DAI
        // reserveData.amount = 1000 * 1e18;
        uint16 referral = 0;

        // Approve LendingPool contract to move your DAI
        IERC20(daiAddress).approve(lendingPoolCoreAddress, _amount);

        // Deposit 1000 DAI
        getLendingPool().deposit(_reserve, _amount, referral);
    }

    function withdraw(address _reserve, uint256 _amount) external override {}

    function getReserves() external override returns (address[] memory) {
        return getLendingPool().getReserves();
    }

    function getLendingPool() internal view returns (ILendingPool) {
        return ILendingPool(lendingPoolAddress);
    }

    function getLendingPoolCore() internal returns (ILendingPoolCore) {
        return ILendingPoolCore(lendingPoolCoreAddress);
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
        return getLendingPool().getReserveData(_reserveAddress);
    }
}
