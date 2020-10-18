// Helper for deploy some smartconsracts

import {
  AaveLendingPoolMockInstance,
  DaiMockTokenInstance,
} from '../../types/truffle-contracts';
import {AaveReserve} from './aaveReserve';

export class AaveDeployer {
  private readonly _deployer: string;

  constructor(deployer: string) {
    this._deployer = deployer;
  }

  async newAaveLendingPoolMock(name: string): Promise<AaveLendingPoolMockInstance> {
    const mock = await artifacts.require('AaveLendingPoolMock').new({
      from: this._deployer,
    });
    await mock.setMockId(name);
    return mock;
  }

  async generateTokenContract(): Promise<DaiMockTokenInstance> {
    const token = await artifacts.require('DAIMockToken').new('DAI', 'DAI', {from: this._deployer});
    await token.mint(this._deployer, '10000000000');
    return token;
  }

  async setReserveToAaveMock(
    _aaveLandingPoolMock: AaveLendingPoolMockInstance,
    _reserve: AaveReserve
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
