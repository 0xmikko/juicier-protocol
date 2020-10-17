import {
  AaveLendingPoolMockInstance,
  AaveProviderInstance,
  ProvidersManagerInstance,
  PoolInstance,
  VTokenInstance,
} from '../types/truffle-contracts';
import BigNumber from 'bignumber.js';
import {expectEvent} from '@openzeppelin/test-helpers';

import {SmartDeployer} from './core/deployer';
import {aaveReserves} from './core/aaveReserve';

contract('Pool', async ([deployer, ...users]) => {
  let smartDeployer: SmartDeployer;

  let _aaveLendingPoolMock: AaveLendingPoolMockInstance;
  let _aaveProvider: AaveProviderInstance;

  let _anotherLendingPoolMock: AaveLendingPoolMockInstance;
  let _anotherProvider: AaveProviderInstance;

  let _providersManager: ProvidersManagerInstance;
  let _pool: PoolInstance;

  let _vitaminDai: VTokenInstance;

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

    _vitaminDai = await smartDeployer.addReserveToPool(dai.address, dai.name, dai.name);
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
    const expectedUserBalance = await _vitaminDai.principalBalanceOf(users[0]);

    await expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, 'DepositMock', {
      _reserve: dai.address,
      _user: _aaveProvider.address,
      _amount: '100',
      _referral: '0',
      _mockId: 'MainLendingPool',
    });

    await expectEvent.inTransaction(receipt.tx, _vitaminDai, 'MintOnDeposit', {
      _from: users[0],
      _value: '100',
      _fromBalanceIncrease: '0',
      _fromIndex: '0',
    });

    expect(avaibleLiquidityPM.toString()).to.be.equal(new BigNumber(100).toFixed(0));
    expect(availableLiquidityAaveProvider.toString()).to.be.equal(new BigNumber(100).toFixed(0));
    expect(availableLiquidityAnotherProvider.toString()).to.be.equal(new BigNumber(0).toFixed(0));
    expect(expectedUserBalance.toString()).to.be.equal(new BigNumber(100).toFixed(0));
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
    const expectedUserBalance = await _vitaminDai.principalBalanceOf(users[0]);

    await expectEvent.inTransaction(receipt.tx, _vitaminDai, 'MintOnDeposit', {
      _from: users[0],
      _value: '100',
      _fromBalanceIncrease: '0',
      _fromIndex: '0',
    });

    await expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, 'DepositMock', {
      _reserve: dai.address,
      _user: _anotherProvider.address,
      _amount: '100',
      _referral: '0',
      _mockId: 'AnotherLendingPool',
    });

    expect(avaibleLiquidityPM.toString()).to.be.equal(new BigNumber(100).toFixed(0));
    expect(availableLiquidityAaveProvider.toString()).to.be.equal(new BigNumber(0).toFixed(0));
    expect(availableLiquidityAnotherProvider.toString()).to.be.equal(new BigNumber(100).toFixed(0));
    expect(expectedUserBalance.toString()).to.be.equal(new BigNumber(100).toFixed(0));
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
    const expectedUserBalance = await _vitaminDai.principalBalanceOf(users[0]);

    await expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, 'RedeemMock', {
      _reserve: dai.address,
      _user: users[0],
      _amount: '50',
      _mockId: 'MainLendingPool',
    });

    expect(avaibleLiquidityPM.toString()).to.be.equal(new BigNumber(50).toFixed(0));
    expect(availableLiquidityAaveProvider.toString()).to.be.equal(new BigNumber(50).toFixed(0));
    expect(availableLiquidityAnotherProvider.toString()).to.be.equal(new BigNumber(0).toFixed(0));
    expect(expectedUserBalance.toString()).to.be.equal(new BigNumber(50).toFixed(0));
  });

  // Another test for best rate
  it('Pool reedeems money from provider with lowest rate', async () => {
    const anotherDai = {...dai};

    // Make anotherDai less attractive
    // Contract will put money into aaveMock
    anotherDai.liquidityRate -= 1;
    await smartDeployer.setReserveToAaveMock(_anotherLendingPoolMock, anotherDai);
    await _pool.deposit(dai.address, 100, {from: users[0]});

    // Make anotherDai more attractive
    // Contract will put money into anotherMock
    anotherDai.liquidityRate += 10;
    await smartDeployer.setReserveToAaveMock(_anotherLendingPoolMock, anotherDai);
    await _pool.deposit(dai.address, 100, {from: users[0]});

    const receipt = await _pool.redeem(dai.address, 150, {from: users[0]});

    const avaibleLiquidityPM = await _providersManager.getAvaibleLiquidity(dai.address);
    const availableLiquidityAaveProvider = await _aaveProvider.getAvaibleLiquidity(dai.address);
    const availableLiquidityAnotherProvider = await _anotherProvider.getAvaibleLiquidity(
      dai.address
    );
    const expectedUserBalance = await _vitaminDai.principalBalanceOf(users[0]);

    // We expect that contract tool 100 from MainLendingPool case it has lower liquidity rate
    await expectEvent.inTransaction(receipt.tx, _aaveLendingPoolMock, 'RedeemMock', {
      _reserve: dai.address,
      _user: users[0],
      _amount: '100',
      _mockId: 'MainLendingPool',
    });

    // And anothr 50 from AnotherLendingPool case it has highest liquidity rate
    await expectEvent.inTransaction(receipt.tx, _anotherLendingPoolMock, 'RedeemMock', {
      _reserve: dai.address,
      _user: users[0],
      _amount: '50',
      _mockId: 'AnotherLendingPool',
    });

    expect(avaibleLiquidityPM.toString()).to.be.equal(new BigNumber(50).toFixed(0));
    expect(availableLiquidityAaveProvider.toString()).to.be.equal(new BigNumber(0).toFixed(0));
    expect(availableLiquidityAnotherProvider.toString()).to.be.equal(new BigNumber(50).toFixed(0));
    expect(expectedUserBalance.toString()).to.be.equal(new BigNumber(50).toFixed(0));
  });

  it("Should wait", async() => {
    await new Promise( resolve => setTimeout(resolve, 3000) );
  })

});
