// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;
import "./ProviderService.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract RateService {
  using SafeMath for uint256;
  uint256 constant SHARE = 20;

  ProviderService private providerService;
  AddressRepository private addressRepository;

  constructor(address _addressRepository) public {
    addressRepository = AddressRepository(_addressRepository);
    providerService = ProviderService(addressRepository.getProviderService());
  }

  function getDepositRate(address _reserve) public view returns (uint256) {
    (uint256 bestDepositRate, uint256 bestBorrowRate) = providerService
      .getBestRates(_reserve);
    return bestDepositRate;
  }

  // borrowRate = bestDepositRate + (bestBorrowRate - bestDepositRate) * SHARE
  function getBorrowRate(address _reserve) public view returns (uint256) {
    (uint256 bestDepositRate, uint256 bestBorrowRate) = providerService
      .getBestRates(_reserve);
    return computeBestBorrowRate(bestDepositRate, bestBorrowRate);
  }

  function computeBestBorrowRate(
    uint256 _bestDepositRate,
    uint256 _bestBorrowRate
  ) public pure returns (uint256) {
    uint256 delta = _bestBorrowRate.sub(_bestDepositRate).mul(SHARE).div(100);
    return _bestDepositRate.add(delta);
  }
}
