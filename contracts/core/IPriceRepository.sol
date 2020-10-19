// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

interface IPriceRepository {
  function getReservePriceInETH(address _reserve)
    external
    view
    returns (uint256);
}
