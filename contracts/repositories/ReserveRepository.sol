// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "../token/VToken.sol";

/**
 * @title ReserveRepository
 * @notice Stores reserves data
 * @author Mikhail Lazarev, github.com/MikaelLazarev
 */
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

  address[] private reservesList;
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

    reservesList.push(_reserve);
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

  function addLiquidity(address _reserve, uint256 _liquidity)
  external
  {
    reserves[_reserve].totalLiquidity += _liquidity;
    reserves[_reserve].availableLiquidity += _liquidity;
  }

  function setTokenContract(address _reserve, address _contractAddress)
    external
  {
    reserves[_reserve].vTokenContract = _contractAddress;
  }

  function getVTokenContract(address _reserve) public view returns (address) {
    return reserves[_reserve].vTokenContract;
  }

  function isActive(address _reserve) external view returns (bool) {
    return reserves[_reserve].isActive;
  }

  function setActive(address _reserve, bool _active) external {
    reserves[_reserve].isActive = _active;
  }

  function getLoanToValue(address _reserve) external view returns (uint256) {
    return reserves[_reserve].loanToValue;
  }

  function getLiquidationThreshold(address _reserve)
    external
    view
    returns (uint256)
  {
    return reserves[_reserve].liquidationThreshold;
  }

  function getLiquidationBonus(address _reserve)
    external
    view
    returns (uint256)
  {
    return reserves[_reserve].liquidationBonus;
  }

  function getReserveSymbol(address _reserve)
    external
    view
    returns (string memory)
  {
    return VToken(getVTokenContract(_reserve)).symbol();
  }

  function getReservesQty() external view returns (uint256) {
    return reservesList.length;
  }

  function getReserveByIndex(uint256 _index) external view returns (address) {
    return reservesList[_index];
  }
}
