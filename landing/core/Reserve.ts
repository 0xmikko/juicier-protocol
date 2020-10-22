import {BigNumber} from "bignumber.js";

export interface Reserve {
    name: string;
    iconUrl: string;
    depositRate: number;
    borrowRate: number;
    totalLiquidity: number
    availableLiquidity:number
}
