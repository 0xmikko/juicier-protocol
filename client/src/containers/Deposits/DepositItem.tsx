import React from "react";
import {Reserve} from "../../core/reserve";
import {Button, Col, Row} from "react-bootstrap";
import {BigNumber} from "bignumber.js";
import {useHistory} from "react-router";

export interface ReserveItemProps {
  data: Reserve;
  backgroundColor?: string;
}

export function DepositItem({data, backgroundColor}: ReserveItemProps) {
  const history = useHistory();

  const vitamin = data.borrowRate
    .minus(data.lendingRate)
    .multipliedBy(new BigNumber("0.4"));
  const lendingVitamin = data.lendingRate.plus(vitamin);

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
        {lendingVitamin.toFixed(2)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        10,000
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        <Button onClick={() => history.push(`/deposits/${data.reserve}`)}>
          Deposit
        </Button>
      </Col>
    </Row>
  );
}
