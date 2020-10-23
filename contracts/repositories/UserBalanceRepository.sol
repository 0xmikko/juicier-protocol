// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../core/Core.sol";

/**
 * @title UserBalanceRepository
 * @notice Stores user balances
 * @author Mikhail Lazarev, github.com/MikaelLazarev
 */
contract UserBalanceRepository {
  using SafeMath for uint256;
  mapping(address => Core.UserAssets) private userAssets;

  function findReserveIndexOrCreate(address _user, address _reserve)
    public
    returns (uint256)
  {
    Core.UserReserveBalance[] storage userBalances = userAssets[_user]
      .reserveBalances;
    uint256 userReservesQty = userBalances.length;
    for (uint256 i = 0; i < userReservesQty; i++) {
      if (userBalances[i].reserve == _reserve) {
        return i;
      }
    }
    userBalances.push(Core.UserReserveBalance(_reserve, 0, 0));
    return userReservesQty;
  }

  function increaseUserDeposit(
    address _user,
    address _reserve,
    uint256 _amount
  ) public {
    Core.UserReserveBalance[] storage userBalances = userAssets[_user]
      .reserveBalances;
    uint256 index = findReserveIndexOrCreate(_user, _reserve);
    Core.UserReserveBalance storage userReserveBalance = userBalances[index];
    userReserveBalance.deposited = userReserveBalance.deposited.add(_amount);
  }

  function decreaseUserDeposit(
    address _user,
    address _reserve,
    uint256 _amount
  ) public {
    Core.UserReserveBalance[] storage userBalances = userAssets[_user]
      .reserveBalances;
    uint256 index = findReserveIndexOrCreate(_user, _reserve);
    Core.UserReserveBalance storage userReserveBalace = userBalances[index];
    userReserveBalace.deposited = userReserveBalace.deposited.sub(_amount);
  }

  function increaseUserBorrow(
    address _user,
    address _reserve,
    uint256 _amount
  ) public {
    Core.UserReserveBalance[] storage userBalances = userAssets[_user]
      .reserveBalances;
    uint256 index = findReserveIndexOrCreate(_user, _reserve);
    Core.UserReserveBalance storage userReserveBalace = userBalances[index];
    userReserveBalace.borrowed = userReserveBalace.borrowed.add(_amount);
  }

  function decreaseUserBorrow(
    address _user,
    address _reserve,
    uint256 _amount
  ) public {
    Core.UserReserveBalance[] storage userBalances = userAssets[_user]
      .reserveBalances;
    uint256 index = findReserveIndexOrCreate(_user, _reserve);
    Core.UserReserveBalance storage userReserveBalace = userBalances[index];
    userReserveBalace.borrowed = userReserveBalace.borrowed.sub(_amount);
  }

  function getUserReservesQty(address _user) public view returns (uint256) {
    Core.UserReserveBalance[] storage userBalances = userAssets[_user]
      .reserveBalances;
    return userBalances.length;
  }

  function getUserReserveBalance(address _user, uint256 _index)
    public
    view
    returns (
      address reserve,
      uint256 deposited,
      uint256 borrowed
    )
  {
    Core.UserReserveBalance[] storage userBalances = userAssets[_user]
      .reserveBalances;
    Core.UserReserveBalance storage userReserveBalace = userBalances[_index];
    reserve = userReserveBalace.reserve;
    deposited = userReserveBalace.deposited;
    borrowed = userReserveBalace.borrowed;
  }
}
