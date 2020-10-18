// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../core/ILendingProvider.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

abstract contract AbstractProvider is ILendingProvider, Ownable {
  mapping(address => uint256) totalLiquidity;
  mapping(address => uint256) availableLiquidity;

  function deposit(address _reserve, uint256 _amount)
    public
    virtual
    override
    payable
  {
    totalLiquidity[_reserve] += _amount;
    availableLiquidity[_reserve] += _amount;
  }

  function redeemUnderlying(
    address _reserve,
    address payable _user,
    uint256 _amount
  ) public virtual override {

    require(availableLiquidity[_reserve] >= _amount, "AbstractProvider: Not enough liquidity");

    totalLiquidity[_reserve] -= _amount;
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
