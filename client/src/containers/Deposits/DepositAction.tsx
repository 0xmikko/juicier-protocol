import React, {useEffect} from "react";
import {Button, Card} from "react-bootstrap";
import {Token} from "../../core/token";
import {LoadingView} from "rn-web-components";

export interface ApproveToPoolProps {
  data?: Token
}
export function DepositAction({data}: ApproveToPoolProps): React.ReactElement {
  useEffect(() => {});
  if (data === undefined) return <LoadingView/>
  return (
    <Card>
      <Card.Header>Deposit</Card.Header>
        <Card.Body><Button disabled={data.allowance === 0}>Deposit</Button></Card.Body>
    </Card>
  );
}
