// SPDX-License-Identifier: MIT
pragma solidity ^0.6.10;
import "../core/IPriceRepository.sol";

contract PriceRepositoryMock is IPriceRepository {
  function getReservePriceInETH(address _reserve)
    external
    override
    view
    returns (uint256)
  {
    return 1;
  }
}
