import {
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
} from "../types/truffle-contracts";
import {aaveReserves} from "./core/reserve";
import BN from "bn.js";

contract("AaveProvider", async ([deployer, ...users]) => {
  let _aaveLandingPoolMock: AaveLendingPoolMockInstance;
  let _aaveProvider: AaveProviderInstance;
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

    _aaveProvider = await artifacts
      .require("AaveProvider")
      .new(_aaveLandingPoolMock.address, {
        from: deployer,
      });
  });

  it("it correctly returns liquidityRate", async () => {
    const liquidityRate = await _aaveProvider.getReserveLiquidityRate(
      dai.address
    );

    expect(liquidityRate.eq(new BN(dai.liquidityRate))).to.be.equal(
      true,
      " incorrect liquidityRate"
    );
  });
});
