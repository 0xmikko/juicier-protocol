import {
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
  ProvidersManagerInstance,
} from '../types/truffle-contracts';
import {aaveReserves} from './core/reserve';
import BN from 'bn.js';
import {SmartDeployer} from './core/deployer';

contract('ProvidersManager - selecting liquidity providers', async ([deployer, ...users]) => {
  let smartDeployer: SmartDeployer;

  let _aaveLendingPoolMock: AaveLendingPoolMockInstance;
  let _aaveProvider: AaveProviderInstance;

  let _anotherLendingPoolMock: AaveLendingPoolMockInstance;
  let _anotherProvider: AaveProviderInstance;

  let _providersManager: ProvidersManagerInstance;
  const dai = aaveReserves['DAI'];

  beforeEach('Initial setup...', async () => {
    // Create 2 different Providers
    smartDeployer = new SmartDeployer(deployer);

    _providersManager = await smartDeployer.getProvidersManager();

    // AAVE PROVIDER
    _aaveLendingPoolMock = await smartDeployer.newAaveLendingPoolMock('MainLendingPool');
    _aaveProvider = await smartDeployer.registerAaveProviderFromMock(_aaveLendingPoolMock);
    await smartDeployer.setReserveToAaveMock(_aaveLendingPoolMock, dai);

    // ANOTHER PROVIDER
    _anotherLendingPoolMock = await smartDeployer.newAaveLendingPoolMock('AnotherLendingPool');
    _anotherProvider = await smartDeployer.registerAaveProviderFromMock(_anotherLendingPoolMock);
    await smartDeployer.setReserveToAaveMock(_anotherLendingPoolMock, dai);
  });

  // Another test for best rate
  it('Provider manager should choose provider with better liquidity rate -1', async () => {
    const anotherDai = {...dai};
    anotherDai.liquidityRate -= 1;

    await smartDeployer.setReserveToAaveMock(_anotherLendingPoolMock, anotherDai);

    const betterProviderAddress = await _providersManager.getProviderWithHighestLiquidityRate(
      dai.address
    );

    expect(betterProviderAddress).to.be.equal(_aaveProvider.address);
    console.log('AaveProvider', _aaveProvider.address);
  });

  // Another test for best rate
  it('Provider manager should choose provider with better liquidity rate +1', async () => {
    const anotherDai = {...dai};
    anotherDai.liquidityRate += 1;

    await smartDeployer.setReserveToAaveMock(_anotherLendingPoolMock, anotherDai);

    const betterProviderAddress = await _providersManager.getProviderWithHighestLiquidityRate(
      dai.address
    );

    expect(betterProviderAddress).to.be.equal(_anotherProvider.address);
  });
});
