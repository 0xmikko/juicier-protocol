// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../interfaces/ILendingProvider.sol";

abstract contract AbstractProvider is ILendingProvider {
    mapping(address => uint256) availableLiquidity;

    function deposit(address _reserve, uint256 _amount)
        public
        virtual
        override
        payable
    {
        availableLiquidity[_reserve] += _amount;
    }

    function redeemUnderlying(
        address _reserve,
        address payable _user,
        uint256 _amount
    ) public virtual override {
        require(availableLiquidity[_reserve] > _amount, "Not enough liquidity");
        availableLiquidity[_reserve] -= _amount;
    }

    function getAvaibleLiquidity(address _reserve)
        public
        override
        view
        returns (uint256)
    {
        return availableLiquidity[_reserve];
    }
}
