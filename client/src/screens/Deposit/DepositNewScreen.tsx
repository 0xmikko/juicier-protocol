import React, {useEffect} from "react";
import actions from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {reservesSelector} from "../../store/reserves";
import AppBar from "../../components/AppBar/AppBar";
import {Footer} from "../../components/Footer/Footer";
import {DepositListWidget} from "../../containers/Deposits/DepositsListWidget";
import {Layout} from "../Layout";
import {Col, Container, Row} from "react-bootstrap";
import {RouteComponentProps} from "react-router";
import {ApproveToPool} from "../../containers/Deposits/ApproveToPool";
import {tokenSelector} from "../../store/tokens";
import {DepositAction} from "../../containers/Deposits/DepositAction";
import {Helmet} from "react-helmet";

interface MatchParams {
  id: string;
}

export interface DepositNewScreenProps
  extends RouteComponentProps<MatchParams> {}

export function DepositNewScreen({
  match: {
    params: {id},
  },
}: DepositNewScreenProps): React.ReactElement {
  const dispatch = useDispatch();
  const reserves = useSelector(reservesSelector);

  useEffect(() => {
    if (id !== undefined && id !== "")
      dispatch(actions.tokens.getTokenDetails(id));
  }, [id]);

  const data = useSelector(tokenSelector(id));

  console.log(data);

  const inReserve = data?.name === undefined ? "" : `in ${data.name}`;

  return (
    <Layout>
      <Helmet title={"New deposits | Juicer Protocol"} />
      <Container style={{textAlign: "center", marginTop: "3.5rem"}}>
        <Row
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{margin: "auto", color: "#333"}}>
            New deposit {inReserve}
          </h2>
          <h5>Your balance: {data?.balance || ""}</h5>
        </Row>
        <Row style={{marginBottom: "1.5rem"}}>
          <Col xl={4} lg={4} md={2} xs={1}></Col>
          <Col xl={4} lg={4} md={8}>
            <ApproveToPool data={data} />
          </Col>
        </Row>
        <Row style={{marginBottom: "1.5rem"}}>
          <Col xl={4} lg={4} md={2} xs={1}></Col>
          <Col xl={4} lg={4} md={8}>
            <DepositAction data={data} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
