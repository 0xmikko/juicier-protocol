import React, {useEffect} from 'react';
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {reservesSelector} from "../../store/reserves";
import {ReserveListWidget} from "../../containers/Reserves/ReservesListWidget";
import AppBar from "../../components/AppBar/AppBar";
import {Footer} from "../../components/Footer/Footer";

export function DepositListScreen() : React.ReactElement {
    const dispatch = useDispatch();

    const reserves = useSelector(reservesSelector);

    useEffect(() => {
        dispatch(actions.reserves.getReserves());
    }, [])

    return <>
        <AppBar/>
        <ReserveListWidget data={reserves.data} />
        <Footer />
        </>
}
