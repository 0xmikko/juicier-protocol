// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.6.10;

import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "../core/ILendingProvider.sol";
import "../repositories/AddressRepository.sol";
import "../repositories/ProviderRepository.sol";

/**
 * @title ProvidersService
 * @notice Manages connected Lending providers
 * @author Mikhail Lazarev, github.com/MikaelLazarev
 */

contract ProviderService is Ownable {
  ProviderRepository private providerRepository;

  modifier providersListIsNotEmpy() {
    require(
      providerRepository.getProvidersQty() > 0,
      "ProviderService: providers list is empty!"
    );
    _;
  }

  constructor(address addressRepositoryAddress) public {
    AddressRepository addressRepository = AddressRepository(
      addressRepositoryAddress
    );
    providerRepository = ProviderRepository(
      addressRepository.getProviderRepository()
    );
  }

  function getProviderWithHighestLiquidityRate(address _reserveAddress)
    external
    view
    providersListIsNotEmpy
    returns (address)
  {
    uint256 providersListQty = providerRepository.getProvidersQty();
    ILendingProvider result = ILendingProvider(providerRepository.getProviderByIndex(0));
    uint256 liquidityRate = 0;

    for (uint256 i = 0; i < providersListQty; i++) {
      ILendingProvider curProvider = ILendingProvider(providerRepository.getProviderByIndex(i));
      uint256 curLiquidityRate = curProvider.getReserveLiquidityRate(
        _reserveAddress
      );
      if (curLiquidityRate > liquidityRate) {
        result = curProvider;
        liquidityRate = curLiquidityRate;
      }
    }
    return address(result);
  }

  function getProviderWithLowestLiquidityRate(address _reserveAddress)
    external
    view
    providersListIsNotEmpy
    returns (address providerAddress, uint256 availableLiquidity)
  {
    uint256 providersListQty = providerRepository.getProvidersQty();
    ILendingProvider provider = ILendingProvider(providerRepository.getProviderByIndex(0));

    uint256 liquidityRate = uint256(-1);
    availableLiquidity = 0;

    for (uint256 i = 0; i < providersListQty; i++) {
      ILendingProvider curProvider = ILendingProvider(providerRepository.getProviderByIndex(i));
      uint256 curLiquidityRate = curProvider.getReserveLiquidityRate(
        _reserveAddress
      );

      // If we found lower rate
      if (curLiquidityRate < liquidityRate) {
        // check how much liquidity provider has
        uint256 curAvaibleLiquidity = curProvider.getAvaibleLiquidity(
          _reserveAddress
        );

        // if liquidity > 0, set it as result provider till we do not find better one
        if (curAvaibleLiquidity > 0) {
          provider = curProvider;
          availableLiquidity = curAvaibleLiquidity;
          liquidityRate = curLiquidityRate;
        }
      }
    }

    providerAddress = address(provider);
  }

  function getTotalAvaibleLiquidity(address _reserveAddress)
    external
    view
    providersListIsNotEmpy
    returns (uint256)
  {
    uint256 availableLiquidity = 0;
    uint256 providerListLenght = providerRepository.getProvidersQty();
    for (uint256 i = 0; i < providerListLenght; i++) {
      availableLiquidity += ILendingProvider(providerRepository
        .getProviderByIndex(i))
        .getAvaibleLiquidity(_reserveAddress);
    }
    return availableLiquidity;
  }

  function getBestRates(address _reserve) external view providersListIsNotEmpy returns (uint256, uint256)   {
    uint256 providersListQty = providerRepository.getProvidersQty();
    uint256 depositRate = 0;
    uint256 borrowRate = uint256(-1);

    for (uint256 i = 0; i < providersListQty; i++) {
      ILendingProvider curProvider = ILendingProvider(providerRepository.getProviderByIndex(i));
      uint256 curDepositRate = curProvider.getReserveLiquidityRate(
        _reserve
      );
      uint256 curBorrowRate = curProvider.getReserveBorrowRate(_reserve);
      if (curDepositRate > depositRate) {
          depositRate = curDepositRate;
      }
      if (curBorrowRate < borrowRate) {
          borrowRate = curBorrowRate;
      }
    }
    return (depositRate, borrowRate);
  }



}
