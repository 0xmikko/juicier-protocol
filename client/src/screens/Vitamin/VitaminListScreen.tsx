import React, {useEffect} from "react";
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {reservesSelector} from "../../store/reserves";
import {Layout} from "../Layout";
import {LoansListWidget} from "../../containers/Loans/LoansListWidget";
import {VitaminListWidget} from "../../containers/Vitamins/VitaminsListWidget";

export function VitaminListScreen(): React.ReactElement {
  const dispatch = useDispatch();

  const reserves = useSelector(reservesSelector);

  useEffect(() => {
    dispatch(actions.reserves.getReserves());
  }, []);

  return (
    <Layout>
      <VitaminListWidget data={reserves.data} />
    </Layout>
  );
}
