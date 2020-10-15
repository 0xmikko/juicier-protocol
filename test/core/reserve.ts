import {AaveLendingPoolMockInstance} from "../../types/truffle-contracts";

export interface Reserve {
  name: string;
  address: string;
  totalLiquidity: number;
  availableLiquidity: number;
  totalBorrowsStable: number;
  totalBorrowsVariable: number;
  liquidityRate: number;
  variableBorrowRate: number;
  stableBorrowRate: number;
  averageStableBorrowRate: number;
  utilizationRate: number;
  liquidityIndex: number;
  variableBorrowIndex: number;
  aTokenAddress: string;
  lastUpdateTimestamp: number;
}

export const aaveReserves: Record<string, Reserve> = {
  DAI: {
    name: "DAI",
    address: "0xC4375B7De8af5a38a93548eb8453a498222C4fF2",
    aTokenAddress: "0x58AD4cB396411B691A9AAb6F74545b2C5217FE6a", // Kovan
    availableLiquidity: 1200,
    averageStableBorrowRate: 434,
    liquidityIndex: 1,
    liquidityRate: 20000,
    stableBorrowRate: 3,
    totalBorrowsStable: 4,
    totalBorrowsVariable: 5,
    totalLiquidity: 6,
    utilizationRate: 7,
    variableBorrowIndex: 8,
    variableBorrowRate: 9,
    lastUpdateTimestamp: Math.floor(Date.now() / 1000),
  },
};

export async function addReserveToAaveMock(
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
