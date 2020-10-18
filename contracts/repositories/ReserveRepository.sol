// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../token/VToken.sol";

contract ReserveRepository {
  
  struct Reserve {
    uint256 totalLiquidity;
    uint256 availableLiquidity;
    address vTokenContract;
    bool isActive;
  }

  mapping(address => Reserve) reserves;

  function isReserveActive(address _reserve) external view returns (bool) {
    return reserves[_reserve].isActive;
  }

  function getTotalLiquidity(address _reserve) external view returns (uint256) {
    return reserves[_reserve].totalLiquidity;
  }

  function setTotalLiquidity(address _reserve, uint256 _totalLiquidity)
    external
  {
    reserves[_reserve].totalLiquidity = _totalLiquidity;
  }

  function getAvailableLiquidity(address _reserve)
    external
    view
    returns (uint256)
  {
    return reserves[_reserve].availableLiquidity;
  }

  function setAvailableLiquidity(address _reserve, uint256 _availableLiquidity)
    external
  {
    reserves[_reserve].availableLiquidity = _availableLiquidity;
  }

  function setTokenContract(address _reserve, address _contractAddress) external {
      reserves[_reserve].vTokenContract = _contractAddress;
  }

  function getVTokenContract(address _reserve) external view returns (VToken) {
    return VToken(reserves[_reserve].vTokenContract);
  }

  function isActive(address _reserve) external view returns (bool) {
      return reserves[_reserve].isActive;
  }

  function setActive(address _reserve, bool _active) external {
      reserves[_reserve].isActive = _active;
  }
}
