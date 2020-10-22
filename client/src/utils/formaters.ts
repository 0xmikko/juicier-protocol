/*
 * Stackdrive. Self-order apps for business
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {BigNumber} from 'bignumber.js';
import moment from 'moment';

export function rayRate(number: BigNumber): string {
  return number.div(new BigNumber('1e24')).toFixed(2);
}

export function tokenDecimals(number: string, decimals: number ) : number {
  return parseFloat((new BigNumber(number)).div(`1e${decimals}`).toFixed(3));
}

export function numberWithCommas(x: number | undefined) {
  if (x === undefined) return '';
  const parts = x.toString().split('.');

  return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function toHumanDate(d: Date | undefined | number | string): string {
  return moment(d).format('YYYY-MM-DD HH:mm');
}
