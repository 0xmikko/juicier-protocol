import React from "react";
import {Reserve} from "../../core/Reserve";
import {Col, Row} from "react-bootstrap";

export interface ReserveItemProps {
  data: Reserve;
  backgroundColor?: string;
}

export function ReserveItem({data, backgroundColor}: ReserveItemProps) {
  const vitamin = (data.borrowRate - data.depositRate) * 0.4;

  return (
    <Row
      style={{
        paddingTop: "10px",
        paddingBottom: "10px",
        backgroundColor: backgroundColor || "white",
      }}
    >
      <Col
        xl={4}
        lg={4}
        md={4}
        xs={4}
        style={{textAlign: "left", display: "flex", flexDirection: "row"}}
      >
        <img src={data.iconUrl} style={{height: "30px", marginRight: "10px"}} />
        {data.name}
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {data.depositRate.toFixed(2)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2} style={{color: '#017901', fontWeight: 'bold'}}>
        {(data.depositRate+vitamin).toFixed(2)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {data.borrowRate.toFixed(2)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2} style={{color: '#017901', fontWeight: 'bold'}}>
        {(data.borrowRate-vitamin).toFixed(2)}%
      </Col>
    </Row>
  );
}
