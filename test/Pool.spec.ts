import {
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
  ProvidersManagerInstance,
  PoolInstance,
} from "../types/truffle-contracts";
import {aaveReserves, addReserveToAaveMock} from "./core/reserve";
import BN from "bn.js";
import {expectEvent} from "@openzeppelin/test-helpers";

contract("Pool", async ([deployer, ...users]) => {
  let _aaveLendingPoolMock: AaveLendingPoolMockInstance;
  let _aaveProvider: AaveProviderInstance;

  let _anotherLendingPoolMock: AaveLendingPoolMockInstance;
  let _anotherProvider: AaveProviderInstance;

  let _providersManager: ProvidersManagerInstance;
  let _pool: PoolInstance;
  const dai = aaveReserves["DAI"];

  beforeEach("Initializing Providers Manager", async () => {

    // Create 2 different Providers

    // AAVE PROVIDER
    _aaveLendingPoolMock = await artifacts.require("AaveLendingPoolMock").new({
      from: deployer,
    });

    await addReserveToAaveMock(_aaveLendingPoolMock, dai);
    await _aaveLendingPoolMock.setMockId("MainLendingPool");

    _aaveProvider = await artifacts
    .require("AaveProvider")
    .new(_aaveLendingPoolMock.address, {from: deployer});

    // ANOTHER PROVIDER

    _anotherLendingPoolMock = await artifacts.require("AaveLendingPoolMock").new({
      from: deployer,
    });

    await addReserveToAaveMock(_anotherLendingPoolMock, dai);
    await _anotherLendingPoolMock.setMockId("AnotherLendingPool");

    _anotherProvider = await artifacts
    .require("AaveProvider")
    .new(_anotherLendingPoolMock.address, {from: deployer});


    // SETTING UP PROVIDERS MANAGER

    _providersManager = await artifacts
      .require("ProvidersManager")
      .new({from: deployer});

    _providersManager.setProvider(_aaveProvider.address, {from: deployer});
    _providersManager.setProvider(_anotherProvider.address, {from: deployer});

    // SETTING UP POOL

    _pool = await artifacts.require("Pool").new(_providersManager.address, {
      from: deployer,
    });
  });

  /// Another test for best rate

  it("Pool puts deposit to provider with better liquidity rate -1", async () => {

    const anotherDai = {...dai};
    anotherDai.liquidityRate -= 1;

    await addReserveToAaveMock(_anotherLendingPoolMock, anotherDai);

   

    const receipt = await _pool.deposit(dai.address, 100, {from: users[0]});
    expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, "DepositMock", {
      _reserve: dai.address,
      _user: _aaveProvider.address,
      _amount: "100",
      _referral: "0",
      _mockId: "MainLendingPool",
    });
  });

  /// Another test for best rate

  it("Provider manager should choose provider with better liquidity rate +1", async () => {
    const anotherDai = {...dai};
    anotherDai.liquidityRate += 1;

    await addReserveToAaveMock(_anotherLendingPoolMock, anotherDai);

    const receipt = await _pool.deposit(dai.address, 100, {from: users[0]});
    expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, "DepositMock", {
      _reserve: dai.address,
      _user: _anotherProvider.address,
      _amount: "100",
      _referral: "0",
      _mockId: "AaveProvider",
    });
  });
});
