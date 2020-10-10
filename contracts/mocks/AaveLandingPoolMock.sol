pragma solidity ^0.6.10;

import "../providers/aave-protocol/ILendingPool.sol";

contract AaveLandingPoolMock is ILendingPool {
    function deposit(
        address _reserve,
        uint256 _amount,
        uint16 _referralCode
    ) external payable {}
}
