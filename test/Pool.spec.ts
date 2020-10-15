import {
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
  ProvidersManagerInstance,
} from "../types/truffle-contracts";
import {aaveReserves} from "./core/reserve";
import BN from "bn.js";

contract("AaveLendingPoolMock", async ([deployer, ...users]) => {
  let _aaveLandingPoolMock: AaveLendingPoolMockInstance;
  let _aaveProvider: AaveProviderInstance;
  let _providersManager: ProvidersManagerInstance;
  const dai = aaveReserves["DAI"];

  beforeEach("Initializing Providers Manager", async () => {
    _aaveLandingPoolMock = await artifacts.require("AaveLendingPoolMock").new({
      from: deployer,
    });

    await _aaveLandingPoolMock.addReserve(
      dai.address,
      dai.totalLiquidity,
      dai.availableLiquidity,
      dai.totalBorrowsStable,
      dai.totalBorrowsVariable,
      dai.liquidityRate,
      dai.variableBorrowRate,
      dai.stableBorrowRate,
      dai.averageStableBorrowRate,
      dai.utilizationRate,
      dai.liquidityIndex,
      dai.variableBorrowIndex,
      dai.aTokenAddress,
      dai.lastUpdateTimestamp.toString()
    );

    await _aaveLandingPoolMock.setMockId("BetterRate");

    _aaveProvider = await artifacts
      .require("AaveProvider")
      .new(_aaveLandingPoolMock.address, {from: deployer});
    _providersManager = await artifacts
      .require("ProvidersManager")
      .new({from: deployer});
    _providersManager.setProvider(_aaveProvider.address, {from: deployer});
  });


  /// Another test for best rate


  it("Provider manager should choose provider with better liquidity rate -1", async () => {
    const anotherLandingPoolMock = await artifacts
      .require("AaveLendingPoolMock")
      .new({
        from: deployer,
      });

    await anotherLandingPoolMock.addReserve(
      dai.address,
      dai.totalLiquidity,
      dai.availableLiquidity,
      dai.totalBorrowsStable,
      dai.totalBorrowsVariable,
      dai.liquidityRate - 1,
      dai.variableBorrowRate,
      dai.stableBorrowRate,
      dai.averageStableBorrowRate,
      dai.utilizationRate,
      dai.liquidityIndex,
      dai.variableBorrowIndex,
      dai.aTokenAddress,
      dai.lastUpdateTimestamp.toString()
    );

    await anotherLandingPoolMock.setMockId("Worse rate");

    const anotherProvider = await artifacts
      .require("AaveProvider")
      .new(anotherLandingPoolMock.address, {from: deployer});

    _providersManager.setProvider(anotherProvider.address, {from: deployer});

    const betterProviderAddress = await _providersManager.getProviderWithBestLiquidityRate(
      dai.address
    );

    expect(betterProviderAddress).to.be.equal(_aaveProvider.address);
    console.log("AaveProvider", _aaveProvider.address);

  });


  /// Another test for best rate


  it("Provider manager should choose provider with better liquidity rate +1", async () => {
    const anotherLandingPoolMock = await artifacts
      .require("AaveLendingPoolMock")
      .new({
        from: deployer,
      });

    await anotherLandingPoolMock.addReserve(
      dai.address,
      dai.totalLiquidity,
      dai.availableLiquidity,
      dai.totalBorrowsStable,
      dai.totalBorrowsVariable,
      dai.liquidityRate + 1,
      dai.variableBorrowRate,
      dai.stableBorrowRate,
      dai.averageStableBorrowRate,
      dai.utilizationRate,
      dai.liquidityIndex,
      dai.variableBorrowIndex,
      dai.aTokenAddress,
      dai.lastUpdateTimestamp.toString()
    );

    await anotherLandingPoolMock.setMockId("Better rate");

    const anotherProvider = await artifacts
      .require("AaveProvider")
      .new(anotherLandingPoolMock.address, {from: deployer});
    _providersManager.setProvider(anotherProvider.address, {from: deployer});

    const betterProviderAddress = await _providersManager.getProviderWithBestLiquidityRate(
      dai.address
    );

    expect(betterProviderAddress).to.be.equal(anotherProvider.address);
  });
});
