// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.10;
import "./AbstractProvider.sol";
// Import interface for ERC20 standard
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "./aave-protocol/contracts/lendingpool/LendingPool.sol";
import "./aave-protocol/contracts/lendingpool/LendingPoolCore.sol";

contract AaveProvider is AbstractProvider("Aave") {
    LendingPool private lendingPool;
    LendingPoolCore private lendingPoolCore;

    constructor(address _lendingPoolAddress, address _lendingPoolCoreAddress)
        public
    {
        lendingPool = LendingPool(_lendingPoolAddress);
        lendingPoolCore = LendingPool(_lendingPoolCoreAddress);
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
        IERC20(daiAddress).approve(lendingPoolCore.address, amount);

        // Deposit 1000 DAI
        lendingPool.deposit(_reserve, _amount, referral);
    }

    function withdraw(address _reserve, uint256 _amount) external override {}

    function getReserveData)
}
