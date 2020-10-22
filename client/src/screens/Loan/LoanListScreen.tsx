import React, {useEffect} from "react";
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {reservesSelector} from "../../store/reserves";
import {Layout} from "../Layout";
import {LoansListWidget} from "../../containers/Loans/LoansListWidget";
import {Helmet} from "react-helmet";

export function LoanListScreen(): React.ReactElement {
  const dispatch = useDispatch();

  const reserves = useSelector(reservesSelector);

  useEffect(() => {
    dispatch(actions.reserves.getReserves());
  }, []);

  return (
    <Layout>
      <Helmet title={"Loans | Juicer Protocol"} />
      <LoansListWidget data={reserves.data} />
    </Layout>
  );
}
