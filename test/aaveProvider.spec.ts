import {
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
} from "../types/truffle-contracts";
import {aaveReserves} from "./core/reserve";
import BN from "bn.js";
import {SmartDeployer} from "./core/deployer";

contract("AaveProvider", async ([deployer, ...users]) => {
  let smartDeployer: SmartDeployer;

  let _aaveLendingPoolMock: AaveLendingPoolMockInstance;
  let _aaveProvider: AaveProviderInstance;

  const dai = aaveReserves["DAI"];

  beforeEach("Initial setup...", async () => {
    smartDeployer = new SmartDeployer(deployer);

    // AAVE PROVIDER
    _aaveLendingPoolMock = await smartDeployer.newAaveLendingPoolMock(
      "MainLendingPool"
    );
    _aaveProvider = await smartDeployer.registerAaveProviderFromMock(
      _aaveLendingPoolMock
    );
    await smartDeployer.setReserveToAaveMock(_aaveLendingPoolMock, dai);
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
