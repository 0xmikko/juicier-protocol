import React from "react";
import {Reserve} from "../../core/reserve";
import {Col, Row} from "react-bootstrap";

export interface ReserveItemProps {
  data: Reserve;
  backgroundColor?: string;
}

export function ReserveItem({data, backgroundColor}: ReserveItemProps) {
  return (
    <Row
      style={{
        paddingTop: "10px",
        paddingBottom: "10px",
        backgroundColor: backgroundColor || "white",
      }}
    >
      <Col
        xl={2}
        lg={2}
        md={2}
        xs={2}
        style={{textAlign: "left", display: "flex", flexDirection: "row"}}
      >
        {/*<img src={""} style={{height: "30px", marginRight: "10px"}} />*/}
        {data.symbol}
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {data.totalLiquidity.toString()}
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {data.lendingRate.toFixed(2)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {data.borrowRate.toFixed(2)}%
      </Col>
      {/*<Col xl={2} lg={2} md={2} xs={2}>*/}
      {/*  {data.borrowVitamin.toFixed(2)}%*/}
      {/*</Col>*/}
    </Row>
  );
}
