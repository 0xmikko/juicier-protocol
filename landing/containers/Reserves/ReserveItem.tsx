import React from "react";
import {Reserve} from "../../core/Reserve";
import {Col, Row} from "react-bootstrap";

export interface ReserveItemProps {
  data: Reserve;
  backgroundColor?: string;
}

export function ReserveItem({data, backgroundColor}: ReserveItemProps) {
  return (
    <Row
      style={{paddingTop: "10px", paddingBottom: "10px", backgroundColor: backgroundColor || "white"}}
    >
      <Col
        xl={2}
        lg={2}
        md={2}
        xs={2}
        style={{textAlign: "left", display: "flex", flexDirection: "row"}}
      >
        <img src={data.iconUrl} style={{height: "30px", marginRight: "10px"}} />
        {data.name}
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {data.marketSize}
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {data.depositAPY.toFixed(2)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {data.depositVitamin.toFixed(2)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {data.borrowAPY.toFixed(2)}%
      </Col>
      <Col xl={2} lg={2} md={2} xs={2}>
        {data.borrowVitamin.toFixed(2)}%
      </Col>
    </Row>
  );
}
