import {AaveLendingPoolMockInstance} from "../types/truffle-contracts";
import {aaveReserves} from "./core/reserve";
import BN from "bn.js";
import {SmartDeployer} from "./core/deployer";

contract("AaveLendingPoolMock", async ([deployer, ...users]) => {
  let smartDeployer: SmartDeployer;
  let _aaveLendingPoolMock: AaveLendingPoolMockInstance;
  const dai = aaveReserves["DAI"];

  beforeEach("Initial setup...", async () => {

    smartDeployer = new SmartDeployer(deployer);
    // AAVE PROVIDER
    _aaveLendingPoolMock = await smartDeployer.newAaveLendingPoolMock(
      "MainLendingPool"
    );
    await smartDeployer.setReserveToAaveMock(_aaveLendingPoolMock, dai);
  });

  it("it correctly puts DAI reserve address into address array", async () => {
    const reserves = await _aaveLendingPoolMock.getReserves();
    expect(reserves.length).eq(1);
    expect(reserves[0]).eq(aaveReserves["DAI"].address);
  });

  it("it correctly puts all data", async () => {
    const reserves = await _aaveLendingPoolMock.getReserves();
    const daiAddress = reserves[0];
    const reserveData = await _aaveLendingPoolMock.getReserveData(daiAddress);

    expect(reserveData[0].eq(new BN(dai.totalLiquidity))).to.be.equal(
      true,
      "incorrect total liquidity"
    );
    expect(reserveData[1].eq(new BN(dai.availableLiquidity))).to.be.equal(
      true,
      "availableLiquidity"
    );
    expect(reserveData[2].eq(new BN(dai.totalBorrowsStable))).to.be.equal(
      true,
      " incorrect totalBorrowsStable"
    );
    expect(reserveData[3].eq(new BN(dai.totalBorrowsVariable))).to.be.equal(
      true,
      " incorrect totalBorrowsVariable"
    );
    expect(reserveData[4].eq(new BN(dai.liquidityRate))).to.be.equal(
      true,
      " incorrect liquidityRate"
    );
    expect(reserveData[5].eq(new BN(dai.variableBorrowRate))).to.be.equal(
      true,
      " incorrect variableBorrowRate"
    );
    expect(reserveData[6].eq(new BN(dai.stableBorrowRate))).to.be.equal(
      true,
      " incorrect stableBorrowRate"
    );
    expect(reserveData[7].eq(new BN(dai.averageStableBorrowRate))).to.be.equal(
      true,
      " incorrect averageStableBorrowRate"
    );
    expect(reserveData[8].eq(new BN(dai.utilizationRate))).to.be.equal(
      true,
      " incorrect utilizationRate"
    );
    expect(reserveData[9].eq(new BN(dai.liquidityIndex))).to.be.equal(
      true,
      " incorrect liquidityIndex"
    );
    expect(reserveData[10].eq(new BN(dai.variableBorrowIndex))).to.be.equal(
      true,
      " incorrect variableBorrowIndex"
    );
    expect(reserveData[11]).to.be.equal(
      dai.aTokenAddress,
      " incorrect aTokenAddress"
    );
    assert(
      reserveData[12].eq(new BN(dai.lastUpdateTimestamp)),
      " incorrect lastUpdateTimestamp"
    );
  });
});
