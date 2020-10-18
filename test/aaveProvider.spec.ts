import {AaveLendingPoolMockInstance, AaveProviderInstance} from '../types/truffle-contracts';
import {aaveReserves} from './core/aaveReserve';
import BN from 'bn.js';
import {JucifiDeployer} from './core/jucifiDeployer';
import { AaveDeployer } from './core/aaveDeployer';

contract('AaveProvider', async ([deployer, aaveOwner, ...users]) => {
  let jucifiDeployer: JucifiDeployer;
  let aaveDeployer: AaveDeployer;

  let _aaveLendingPoolMock: AaveLendingPoolMockInstance;
  let _aaveProvider: AaveProviderInstance;

  const dai = aaveReserves['DAI'];

  beforeEach('Initial setup...', async () => {
    jucifiDeployer = new JucifiDeployer(deployer);
    aaveDeployer = new AaveDeployer(aaveOwner);

    // AAVE PROVIDER
    _aaveLendingPoolMock = await aaveDeployer.newAaveLendingPoolMock('MainLendingPool');
    _aaveProvider = await jucifiDeployer.registerAaveProviderFromMock(_aaveLendingPoolMock);
    await aaveDeployer.setReserveToAaveMock(_aaveLendingPoolMock, dai);
  });

  it('it correctly returns liquidityRate', async () => {
    const liquidityRate = await _aaveProvider.getReserveLiquidityRate(dai.address);

    expect(liquidityRate.eq(new BN(dai.liquidityRate))).to.be.equal(
      true,
      ' incorrect liquidityRate'
    );
  });
});
