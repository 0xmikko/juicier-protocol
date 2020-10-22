/*
 * Stackdrive. Self-order apps for business
 * Copyright (c) 2020. Mikhail Lazarev
 */

import {combineReducers} from "redux";
import tokens from "./tokens/reducer";
import reserves from "./reserves/reducer";
import web3 from "./web3/reducer";


export default combineReducers({
 tokens,
 reserves,
 web3
});
