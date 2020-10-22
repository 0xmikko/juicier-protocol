import React from "react";
import {Reserve} from "../../core/reserve";
import {Col, Row} from "react-bootstrap";
import {BigNumber} from "bignumber.js";
import {rayRate, tokenDecimals} from "../../utils/formaters";

export interface ReserveItemProps {
  data: Reserve;
  backgroundColor?: string;
}

export function ReserveItem({data, backgroundColor}: ReserveItemProps) {
  const vitamin = data.borrowRate
    .minus(data.lendingRate)
    .multipliedBy(new BigNumber("0.4"));
  const lendingVitamin = data.lendingRate.plus(vitamin);
  const borrowVitamin = data.borrowRate.minus(vitamin);

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
        {tokenDecimals(data.totalLiquidity.toFixed(2), 18)}
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {rayRate(data.lendingRate)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2} style={{color: '#017901', fontWeight: 'bold'}}>
        {rayRate(lendingVitamin)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {rayRate(data.borrowRate)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2} style={{color: '#017901', fontWeight: 'bold'}}>
        {rayRate(borrowVitamin)}%
      </Col>
    </Row>
  );
}
