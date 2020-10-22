import React from "react";
import {Reserve} from "../../core/reserve";
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
        <Col style={{textAlign: "left"}}>Assets</Col>
        <Col>Market size</Col>
        <Col>Deposit APY</Col>
        <Col>Deposit APY + V</Col>
        <Col>Borrow APY</Col>
        <Col>Borrow APY - V</Col>
      </Row>
      {reservesRendered}
    </Container>
  );
}
