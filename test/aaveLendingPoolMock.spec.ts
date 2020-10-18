import {AaveLendingPoolMockInstance} from '../types/truffle-contracts';
import {aaveReserves} from './core/aaveReserve';
import BigNumber from 'bignumber.js';
import {JucifiDeployer} from './core/jucifiDeployer';
import { AaveDeployer } from './core/aaveDeployer';

contract('AaveLendingPoolMock', async ([deployer, aaveOwner, ...users]) => {
  let jucifiDeployer: JucifiDeployer;
  let aaveDeployer: AaveDeployer;
  
  let _aaveLendingPoolMock: AaveLendingPoolMockInstance;
  const dai = aaveReserves['DAI'];

  beforeEach('Initial setup...', async () => {
    jucifiDeployer = new JucifiDeployer(deployer);
    aaveDeployer = new AaveDeployer(aaveOwner);
    
    // AAVE PROVIDER
    _aaveLendingPoolMock = await aaveDeployer.newAaveLendingPoolMock('MainLendingPool');
    await aaveDeployer.setReserveToAaveMock(_aaveLendingPoolMock, dai);
  });

  it('it correctly puts DAI reserve address into address array', async () => {
    const reserves = await _aaveLendingPoolMock.getReserves();
    expect(reserves.length).eq(1);
    expect(reserves[0]).eq(aaveReserves['DAI'].address);
  });

  it('it correctly puts all data', async () => {
    const reserves = await _aaveLendingPoolMock.getReserves();
    const daiAddress = reserves[0];
    const resData = await _aaveLendingPoolMock.getReserveData(daiAddress);

    expect(resData[0].toString()).to.be.equal(
      new BigNumber(dai.totalLiquidity).toFixed(0),
      'incorrect totalLiquidity'
    );
    expect(resData[1].toString()).to.be.equal(
      new BigNumber(dai.availableLiquidity).toFixed(0),
      'incorrect availableLiquidity'
    );
    expect(resData[2].toString()).to.be.equal(
      new BigNumber(dai.totalBorrowsStable).toFixed(0),
      'incorrect totalBorrowsStable'
    );
    expect(resData[3].toString()).to.be.equal(
      new BigNumber(dai.totalBorrowsVariable).toFixed(0),
      'incorrect totalBorrowsVariable'
    );
    expect(resData[4].toString()).to.be.equal(
      new BigNumber(dai.liquidityRate).toFixed(0),
      'incorrect liquidityRate'
    );
    expect(resData[5].toString()).to.be.equal(
      new BigNumber(dai.variableBorrowRate).toFixed(0),
      'incorrect variableBorrowRate'
    );
    expect(resData[6].toString()).to.be.equal(
      new BigNumber(dai.stableBorrowRate).toFixed(0),
      'incorrect stableBorrowRate'
    );
    expect(resData[7].toString()).to.be.equal(
      new BigNumber(dai.averageStableBorrowRate).toFixed(0),
      'incorrect averageStableBorrowRate'
    );
    expect(resData[8].toString()).to.be.equal(
      new BigNumber(dai.utilizationRate).toFixed(0),
      'incorrect utilizationRate'
    );
    expect(resData[9].toString()).to.be.equal(
      new BigNumber(dai.liquidityIndex).toFixed(0),
      'incorrect liquidityIndex'
    );
    expect(resData[10].toString()).to.be.equal(
      new BigNumber(dai.variableBorrowIndex).toFixed(0),
      'incorrect variableBorrowIndex'
    );
    expect(resData[11]).to.be.equal(dai.aTokenAddress, 'incorrect aTokenAddress');
    expect(resData[12].toString()).to.be.equal(
      new BigNumber(dai.lastUpdateTimestamp).toFixed(0),
      'incorrect lastUpdateTimestamp'
    );
  });
});
