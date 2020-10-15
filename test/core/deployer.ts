// Helper for deploy some smartconsracts

import {
  ProvidersManagerInstance,
  PoolInstance,
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
} from "../../types/truffle-contracts";
import {Reserve} from "./reserve";

export class SmartDeployer {
  private _deployer: string;
  private _providersManager: ProvidersManagerInstance | undefined;
  private _pool: PoolInstance | undefined;

  constructor(deployer: string) {
    this._deployer = deployer;
  }

  async getPool(): Promise<PoolInstance> {
    if (this._pool == undefined) {
      const providersManager = await this.getProvidersManager();
      this._pool = await artifacts
        .require("Pool")
        .new(providersManager.address, {
          from: this._deployer,
        });
    }
    return this._pool;
  }

  async getProvidersManager(): Promise<ProvidersManagerInstance> {
    if (this._providersManager == undefined) {
      this._providersManager = await await artifacts
        .require("ProvidersManager")
        .new({from: this._deployer});
    }
    return this._providersManager;
  }

  async newAaveLendingPoolMock(
    name: string
  ): Promise<AaveLendingPoolMockInstance> {
    const mock = await artifacts.require("AaveLendingPoolMock").new({
      from: this._deployer,
    });
    await mock.setMockId(name);
    return mock;
  }

  async registerAaveProviderFromMock(
    aaveMock: AaveLendingPoolMockInstance
  ): Promise<AaveProviderInstance> {
    const provider = await artifacts
      .require("AaveProvider")
      .new(aaveMock.address, {from: this._deployer});

    const providersManager = await this.getProvidersManager();
    await providersManager.setProvider(provider.address);
    return provider;
  }

  async setReserveToAaveMock(
    _aaveLandingPoolMock: AaveLendingPoolMockInstance,
    _reserve: Reserve
  ) {
    await _aaveLandingPoolMock.setReserve(
      _reserve.address,
      _reserve.totalLiquidity,
      _reserve.availableLiquidity,
      _reserve.totalBorrowsStable,
      _reserve.totalBorrowsVariable,
      _reserve.liquidityRate,
      _reserve.variableBorrowRate,
      _reserve.stableBorrowRate,
      _reserve.averageStableBorrowRate,
      _reserve.utilizationRate,
      _reserve.liquidityIndex,
      _reserve.variableBorrowIndex,
      _reserve.aTokenAddress,
      _reserve.lastUpdateTimestamp.toString()
    );
  }

}
