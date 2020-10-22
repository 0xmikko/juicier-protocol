import React, {useEffect} from 'react';
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {reservesSelector} from "../../store/reserves";
import AppBar from "../../components/AppBar/AppBar";
import {Footer} from "../../components/Footer/Footer";
import {DepositListWidget} from "../../containers/Deposits/DepositsListWidget";
import {Layout} from "../Layout";
import {Container, Row} from "react-bootstrap";

export function DepositNewScreen() : React.ReactElement {
    const dispatch = useDispatch();

    const reserves = useSelector(reservesSelector);

    useEffect(() => {
        dispatch(actions.reserves.getReserves());
    }, [])

    return <Layout>
        <Container style={{textAlign: "center", marginTop: "3.5rem"}}>
            <Row style={{marginBottom: "1.5rem"}}>
                <h2 style={{margin: "auto", color: "#333"}}>New deposit</h2>
            </Row>
        </Container>
    </Layout>
}
