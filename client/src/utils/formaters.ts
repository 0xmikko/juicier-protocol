/*
 * Stackdrive. Self-order apps for business
 * Copyright (c) 2020. Mikhail Lazarev
 */

import moment from "moment";

export function numberWithCommas(x: number | undefined) {
    if (x===undefined) return "";
    const parts = x.toString().split(".");

    return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toHumanDate (d: Date | undefined | number | string) : string{
    return moment(d).format('YYYY-MM-DD HH:mm')

}
