import {
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
  ProvidersManagerInstance,
  PoolInstance,
} from "../types/truffle-contracts";
import {aaveReserves} from "./core/reserve";
import BN from "bn.js";
import {expectEvent} from "@openzeppelin/test-helpers";
import {SmartDeployer} from "./core/deployer";

contract("Pool", async ([deployer, ...users]) => {
  let smartDeployer: SmartDeployer;

  let _aaveLendingPoolMock: AaveLendingPoolMockInstance;
  let _aaveProvider: AaveProviderInstance;

  let _anotherLendingPoolMock: AaveLendingPoolMockInstance;
  let _anotherProvider: AaveProviderInstance;

  let _providersManager: ProvidersManagerInstance;
  let _pool: PoolInstance;
  const dai = aaveReserves["DAI"];

  beforeEach("Initial setup...", async () => {
    // Create 2 different Providers
    smartDeployer = new SmartDeployer(deployer);

    _providersManager = await smartDeployer.getProvidersManager();
    _pool = await smartDeployer.getPool();

    // AAVE PROVIDER
    _aaveLendingPoolMock = await smartDeployer.newAaveLendingPoolMock(
      "MainLendingPool"
    );
    _aaveProvider = await smartDeployer.registerAaveProviderFromMock(
      _aaveLendingPoolMock
    );
    await smartDeployer.setReserveToAaveMock(_aaveLendingPoolMock, dai);

    // ANOTHER PROVIDER
    _anotherLendingPoolMock = await smartDeployer.newAaveLendingPoolMock(
      "AnotherLendingPool"
    );
    _anotherProvider = await smartDeployer.registerAaveProviderFromMock(
      _anotherLendingPoolMock
    );
    await smartDeployer.setReserveToAaveMock(_anotherLendingPoolMock, dai);
  });

  // Another test for best rate
  it("Pool puts deposit to provider with better liquidity rate -1", async () => {
    const anotherDai = {...dai};
    anotherDai.liquidityRate -= 1;

    await smartDeployer.setReserveToAaveMock(
      _anotherLendingPoolMock,
      anotherDai
    );

    const receipt = await _pool.deposit(dai.address, 100, {from: users[0]});
    expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, "DepositMock", {
      _reserve: dai.address,
      _user: _aaveProvider.address,
      _amount: "100",
      _referral: "0",
      _mockId: "MainLendingPool",
    });
  });


  // Another test for best rate
  it("Provider manager should choose provider with better liquidity rate +1", async () => {
    const anotherDai = {...dai};
    anotherDai.liquidityRate += 1;

    await smartDeployer.setReserveToAaveMock(
      _anotherLendingPoolMock,
      anotherDai
    );

    const receipt = await _pool.deposit(dai.address, 100, {from: users[0]});
    expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, "DepositMock", {
      _reserve: dai.address,
      _user: _anotherProvider.address,
      _amount: "100",
      _referral: "0",
      _mockId: "AnotherLendingPool",
    });
  });
});
