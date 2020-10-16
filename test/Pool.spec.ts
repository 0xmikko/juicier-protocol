import {
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
  ProvidersManagerInstance,
  PoolInstance,
} from '../types/truffle-contracts';
import BigNumber from 'bignumber.js';
import {expectEvent} from '@openzeppelin/test-helpers';

import {SmartDeployer} from './core/deployer';
import {aaveReserves} from './core/reserve';

contract('Pool', async ([deployer, ...users]) => {
  let smartDeployer: SmartDeployer;

  let _aaveLendingPoolMock: AaveLendingPoolMockInstance;
  let _aaveProvider: AaveProviderInstance;

  let _anotherLendingPoolMock: AaveLendingPoolMockInstance;
  let _anotherProvider: AaveProviderInstance;

  let _providersManager: ProvidersManagerInstance;
  let _pool: PoolInstance;
  const dai = aaveReserves['DAI'];

  beforeEach('Initial setup...', async () => {
    // Create 2 different Providers
    smartDeployer = new SmartDeployer(deployer);

    _providersManager = await smartDeployer.getProvidersManager();
    _pool = await smartDeployer.getPool();

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
  it('Pool puts deposit to provider with better liquidity rate -1', async () => {
    const anotherDai = {...dai};
    anotherDai.liquidityRate -= 1;

    await smartDeployer.setReserveToAaveMock(_anotherLendingPoolMock, anotherDai);

    const receipt = await _pool.deposit(dai.address, 100, {from: users[0]});

    const avaibleLiquidityPM = await _providersManager.getAvaibleLiquidity(dai.address);
    const availableLiquidityAaveProvider = await _aaveProvider.getAvaibleLiquidity(dai.address);
    const availableLiquidityAnotherProvider = await _anotherProvider.getAvaibleLiquidity(
      dai.address
    );

    expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, 'DepositMock', {
      _reserve: dai.address,
      _user: _aaveProvider.address,
      _amount: '100',
      _referral: '0',
      _mockId: 'MainLendingPool',
    });

    expect(avaibleLiquidityPM.toString()).to.be.equal(new BigNumber(100).toFixed(0));
    expect(availableLiquidityAaveProvider.toString()).to.be.equal(new BigNumber(100).toFixed(0));
    expect(availableLiquidityAnotherProvider.toString()).to.be.equal(new BigNumber(0).toFixed(0));
  });

  // Another test for best rate
  it('Pool puts deposit to provider with better liquidity rate +1', async () => {
    const anotherDai = {...dai};
    anotherDai.liquidityRate += 1;

    await smartDeployer.setReserveToAaveMock(_anotherLendingPoolMock, anotherDai);

    const receipt = await _pool.deposit(dai.address, 100, {from: users[0]});

    const avaibleLiquidityPM = await _providersManager.getAvaibleLiquidity(dai.address);
    const availableLiquidityAaveProvider = await _aaveProvider.getAvaibleLiquidity(dai.address);
    const availableLiquidityAnotherProvider = await _anotherProvider.getAvaibleLiquidity(
      dai.address
    );

    expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, 'DepositMock', {
      _reserve: dai.address,
      _user: _anotherProvider.address,
      _amount: '100',
      _referral: '0',
      _mockId: 'AnotherLendingPool',
    });

    expect(avaibleLiquidityPM.toString()).to.be.equal(new BigNumber(100).toFixed(0));
    expect(availableLiquidityAaveProvider.toString()).to.be.equal(new BigNumber(0).toFixed(0));
    expect(availableLiquidityAnotherProvider.toString()).to.be.equal(new BigNumber(100).toFixed(0));
  });

// Another test for best rate
it('Pool correctly reedeem money', async () => {
  const anotherDai = {...dai};
  anotherDai.liquidityRate -= 1;

  await smartDeployer.setReserveToAaveMock(_anotherLendingPoolMock, anotherDai);
  await _pool.deposit(dai.address, 100, {from: users[0]});

  const receipt = await _pool.redeem(dai.address, 50, {from: users[0]});

  const avaibleLiquidityPM = await _providersManager.getAvaibleLiquidity(dai.address);
  const availableLiquidityAaveProvider = await _aaveProvider.getAvaibleLiquidity(dai.address);
  const availableLiquidityAnotherProvider = await _anotherProvider.getAvaibleLiquidity(
    dai.address
  );

  expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, 'RedeemMock', {
    _reserve: dai.address,
    _user: users[0],
    _amount: '50',
    _mockId: 'MainLendingPool',
  });

  expect(avaibleLiquidityPM.toString()).to.be.equal(new BigNumber(50).toFixed(0));
  expect(availableLiquidityAaveProvider.toString()).to.be.equal(new BigNumber(50).toFixed(0));
  expect(availableLiquidityAnotherProvider.toString()).to.be.equal(new BigNumber(0).toFixed(0));
});


});
