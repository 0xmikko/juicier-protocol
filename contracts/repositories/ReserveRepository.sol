// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../token/VToken.sol";

contract ReserveRepository {
  struct Reserve {
    uint256 totalLiquidity;
    uint256 availableLiquidity;
    uint256 loanToValue;
    uint256 liquidationThreshold;
    uint256 liquidationBonus;
    address vTokenContract;
    bool isActive;
  }

  mapping(address => Reserve) reserves;

  function addReserve(
    address _reserve,
    address _vTokenAddress,
    uint256 _loanToValue,
    uint256 _liquidationThreshold,
    uint256 _liquidationBonus

  ) public {
    reserves[_reserve].loanToValue = _loanToValue;
    reserves[_reserve].liquidationThreshold = _liquidationThreshold;
    reserves[_reserve].liquidationBonus = _liquidationBonus;

    reserves[_reserve].vTokenContract = _vTokenAddress;
    reserves[_reserve].isActive = true;
  }

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

  function setTokenContract(address _reserve, address _contractAddress)
    external
  {
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

  function getLoanToValue(address _reserve) external view returns (uint256)
  {
    return reserves[_reserve].loanToValue;
  }
}
