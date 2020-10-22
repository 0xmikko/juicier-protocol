import React, {useEffect} from "react";
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {reservesSelector} from "../../store/reserves";
import AppBar from "../../components/AppBar/AppBar";
import {Footer} from "../../components/Footer/Footer";
import {DepositListWidget} from "../../containers/Deposits/DepositsListWidget";
import {Layout} from "../Layout";
import {Helmet} from "react-helmet";

export function DepositListScreen(): React.ReactElement {
  const dispatch = useDispatch();

  const reserves = useSelector(reservesSelector);

  useEffect(() => {
    dispatch(actions.reserves.getReserves());
  }, []);

  return (
    <Layout>
      <Helmet title={"Deposits | Juicer Protocol"} />
      <DepositListWidget data={reserves.data} />
    </Layout>
  );
}
