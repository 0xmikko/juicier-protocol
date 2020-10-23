// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../repositories/AddressRepository.sol";
import "../core/IPriceRepository.sol";
import "../repositories/ReserveRepository.sol";
import "../repositories/UserBalanceRepository.sol";

/**
 * @title Risk service
 * @notice Computes risks for borrowers
 * @author Mikhail Lazarev, github.com/MikaelLazarev
 */

contract RiskService {
    using SafeMath for uint256;

  AddressRepository private addressRepository;
  IPriceRepository private priceRepository;
  ReserveRepository private reserveRepository;
  UserBalanceRepository private userBalanceRepository;

  constructor(address _addressRepositoryAddress) public {
    addressRepository = AddressRepository(_addressRepositoryAddress);
    priceRepository = IPriceRepository(addressRepository.getPriceRepository());
    reserveRepository = ReserveRepository(
      addressRepository.getReserveRepository()
    );
    userBalanceRepository = UserBalanceRepository(
      addressRepository.getUserBalanceRepository()
    );
  }

  function getMaxAllowedLoanETH(address _user) public view returns (uint256) {
    uint256 userAssetsQty = userBalanceRepository.getUserReservesQty(_user);
    uint256 allowedLoan = 0;
    for (uint256 i = 0; i < userAssetsQty; i++) {
      (
        address reserve,
        uint256 deposited,
        uint256 borrowed
      ) = userBalanceRepository.getUserReserveBalance(_user, i);
      uint256 ltv = reserveRepository.getLoanToValue(reserve);
      uint256 reservePrice = priceRepository.getReservePriceInETH(reserve);
      uint256 deltaInEth = deposited.sub(borrowed).mul(ltv).mul(reservePrice).div(100);
      allowedLoan = allowedLoan.add(deltaInEth);
    }

    return allowedLoan;
  }
}
