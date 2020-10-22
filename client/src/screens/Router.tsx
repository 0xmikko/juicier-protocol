import React from "react";
import {withTracker} from "../components/withTrackerHOC";
import {Redirect, Route, Switch} from "react-router";
import {DepositListScreen} from "./Deposit/DepositListScreen";
import {LoanListScreen} from "./Loan/LoanListScreen";
import {MarketListScreen} from "./Market/MarketListScreen";
import {DepositNewScreen} from "./Deposit/DepositNewScreen";
import {VitaminListScreen} from "./Vitamin/VitaminListScreen";

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/market" component={withTracker(MarketListScreen)} />
      <Route
        exact
        path="/deposits/:id"
        component={withTracker(DepositNewScreen)}
      />
      <Route
        exact
        path="/deposits"
        component={withTracker(DepositListScreen)}
      />

      <Route exact path="/loans" component={withTracker(LoanListScreen)} />
      <Route exact path="/vitamins" component={withTracker(VitaminListScreen)} />
      <Redirect to={"/market"} />
    </Switch>
  );
};
