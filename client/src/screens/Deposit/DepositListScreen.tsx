import React, {useEffect} from 'react';
import actions from "../../store/actions";
import {useDispatch} from "react-redux";

export function DepositListScreen() : React.ReactElement {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.reserves.getReserves());
    }, [])

    return <div>DEPOSIT</div>
}
