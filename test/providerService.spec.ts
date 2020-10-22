import {
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
  ProviderServiceInstance,
} from '../types/truffle-contracts';
import {aaveReserves} from './core/aaveReserve';
import BN from 'bn.js';
import {JucifiDeployer} from './core/jucifiDeployer';
import { AaveDeployer } from './core/aaveDeployer';

contract('ProviderService', async ([deployer, aaveOwner, ...users]) => {
  let jucifiDeployer: JucifiDeployer;
  let aaveDeployer: AaveDeployer;

  let _aaveLendingPoolMock: AaveLendingPoolMockInstance;
  let _aaveProvider: AaveProviderInstance;

  let _anotherLendingPoolMock: AaveLendingPoolMockInstance;
  let _anotherProvider: AaveProviderInstance;

  let _providerService: ProviderServiceInstance;
  const dai = aaveReserves['DAI'];

  beforeEach('Initial setup...', async () => {
    // Create 2 different Providers
    jucifiDeployer = new JucifiDeployer(deployer);
    aaveDeployer = new AaveDeployer(aaveOwner);


    // AAVE PROVIDER
    _aaveLendingPoolMock = await aaveDeployer.newAaveLendingPoolMock('MainLendingPool');
    await aaveDeployer.setReserveToAaveMock(_aaveLendingPoolMock, dai);

    // ANOTHER PROVIDER
    _anotherLendingPoolMock = await aaveDeployer.newAaveLendingPoolMock('AnotherLendingPool');
    await aaveDeployer.setReserveToAaveMock(_anotherLendingPoolMock, dai);

    // Setting up Provider Service
    _providerService = await jucifiDeployer.getProviderService();
    _aaveProvider = await jucifiDeployer.registerAaveProviderFromMock(_aaveLendingPoolMock);
    _anotherProvider = await jucifiDeployer.registerAaveProviderFromMock(_anotherLendingPoolMock);

  });


  // Another test for best rate
  it('Provider manager should choose provider with better liquidity rate -1', async () => {
    const anotherDai = {...dai};
    anotherDai.liquidityRate -= 1;

    await aaveDeployer.setReserveToAaveMock(_anotherLendingPoolMock, anotherDai);

    const betterProviderAddress = await _providerService.getProviderWithHighestLiquidityRate(
      dai.address
    );

    expect(betterProviderAddress).to.be.equal(_aaveProvider.address);
  });

  // Another test for best rate
  it('Provider manager should choose provider with better liquidity rate +1', async () => {
    const anotherDai = {...dai};
    anotherDai.liquidityRate += 1;

    await aaveDeployer.setReserveToAaveMock(_anotherLendingPoolMock, anotherDai);

    const betterProviderAddress = await _providerService.getProviderWithHighestLiquidityRate(
      dai.address
    );

    expect(betterProviderAddress).to.be.equal(_anotherProvider.address);
  });

  // Another test for best rate
  it('Provider manager should choose correct best rates', async () => {
    const anotherDai = {...dai};
    anotherDai.liquidityRate += 2;
    anotherDai.variableBorrowRate -= 10;

    await aaveDeployer.setReserveToAaveMock(_anotherLendingPoolMock, anotherDai);

    const bestRates = await _providerService.getBestRates(
        dai.address
    );

    console.log(bestRates[0].toString(), bestRates[1].toString());
    // expect(betterProviderAddress).to.be.equal(_anotherProvider.address);
  });
});
