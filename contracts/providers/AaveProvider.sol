// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;
import "./AbstractProvider.sol";
// Import interface for ERC20 standard
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
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
        returns (uint256)
    {
        // Input variables
        address daiAddress = address(
            0x6B175474E89094C44Da98b954EedeAC495271d0F
        ); // mainnet DAI
        // uint256 amount = 1000 * 1e18;
        uint16 referral = 0;

        // Approve LendingPool contract to move your DAI
        IERC20(daiAddress).approve(lendingPoolCoreAddress, _amount);

        // Deposit 1000 DAI
        getLendingPool().deposit(_reserve, _amount, referral);
    }

    function withdraw(address _reserve, uint256 _amount) external override {}

    function getLendingPool() internal returns (ILendingPool) {
        return ILendingPool(lendingPoolAddress);
    }

    function getLendingPoolCore() internal returns (ILendingPoolCore) {
        return ILendingPoolCore(lendingPoolCoreAddress);
    }

    // function getReserveData)
}
