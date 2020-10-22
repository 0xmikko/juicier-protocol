import React, {useEffect} from 'react';
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {reservesSelector} from "../../store/reserves";
import {Layout} from "../Layout";
import {LoansListWidget} from "../../containers/Loans/LoansListWidget";

export function LoanListScreen() : React.ReactElement {
    const dispatch = useDispatch();

    const reserves = useSelector(reservesSelector);

    useEffect(() => {
        dispatch(actions.reserves.getReserves());
    }, [])

    return    <Layout>
        <LoansListWidget data={reserves.data} />
    </Layout>
}
