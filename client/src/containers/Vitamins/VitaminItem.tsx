import React, {useEffect} from "react";
import {Reserve} from "../../core/reserve";
import {Col, Row} from "react-bootstrap";
import {BigNumber} from "bignumber.js";
import {rayRate} from "../../utils/formaters";
import {useDispatch, useSelector} from "react-redux";
import actions from "../../store/actions";
import {tokenSelector} from "../../store/tokens";

export interface ReserveItemProps {
  data: Reserve;
  backgroundColor?: string;
}

export function VitaminItem({data, backgroundColor}: ReserveItemProps) {
  const dispatch = useDispatch();
  const vTokenId = data.vTokenContract;
  useEffect(() => {
    if (data.vTokenContract !== undefined) {
        console.log(data.vTokenContract, data.symbol)
      dispatch(actions.tokens.getTokenDetails(data.vTokenContract));}

  }, [data.vTokenContract]);
  const vTokenData = useSelector(tokenSelector(data.vTokenContract));

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
        style={{textAlign: "left", display: "flex", flexDirection: "row"}}
      >
        {/*<img src={""} style={{height: "30px", marginRight: "10px"}} />*/}
        {data.symbol}
      </Col>
      <Col>
        {vTokenData?.balance}
      </Col>
      <Col>
        {rayRate(vitamin)}%
      </Col>
      <Col>
        {vTokenData?.totalSupply}
      </Col>
    </Row>
  );
}
