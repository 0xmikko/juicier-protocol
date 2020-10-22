import React from "react";
import {Reserve} from "../../core/Reserve";
import {ReserveItem} from "./ReserveItem";
import {Col, Container, Row} from "react-bootstrap";

export interface ReservesListWidgetProps {
  data: Array<Reserve>;
}

export function ReserveListWidget({data}: ReservesListWidgetProps) {
  const reservesRendered = data.map((reserve, i) => (
    <ReserveItem
      data={reserve}
      backgroundColor={i % 2 === 0 ? "#e3e3e3" : "white"}
    />
  ));
  return (
    <Container style={{textAlign: "center", marginTop: "3.5rem"}}>
      <Row style={{marginBottom: "1.5rem"}}>
        <h2 style={{margin: "auto", color: "#333"}}>All markets</h2>
      </Row>
      <Row style={{minHeight: "40px", fontWeight: "bold"}}>
        <Col style={{textAlign: "left"}}   xl={4}
             lg={4}
             md={4}
             xs={4}>Assets</Col>
        <Col xl={2} lg={2} md={2} xs={2}>Deposit APY</Col>
        <Col xl={2} lg={2} md={2} xs={2}>Deposit APY + Vitamin</Col>
        <Col xl={2} lg={2} md={2} xs={2}>Borrow APY</Col>
        <Col xl={2} lg={2} md={2} xs={2}>Borrow APY - Vitamin</Col>
      </Row>
      {reservesRendered}
    </Container>
  );
}
