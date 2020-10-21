import React from "react";
import {withTracker} from "../components/withTrackerHOC";
import {Redirect, Route, Switch} from "react-router";
import {DepositListScreen} from "./Deposit/DepositListScreen";

export const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={withTracker(DepositListScreen)} />
      <Redirect to={"/"} />
    </Switch>
  );
};
