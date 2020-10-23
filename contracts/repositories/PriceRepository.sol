// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../core/IPriceRepository.sol";

/**
 * @title PriceRepository
 * @notice Stores price information
 * @author Mikhail Lazarev, github.com/MikaelLazarev
 */
contract PriceRepository is IPriceRepository {

  function getReservePriceInETH(address _reserve)
    external
    override
    view
    returns (uint256)
  {
    return 1;
  }
}
