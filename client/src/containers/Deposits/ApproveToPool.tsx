import React, {useState} from "react";
import {Button, Card, Form} from "react-bootstrap";
import {Token} from "../../core/token";
import {LoadingView} from "rn-web-components";
import {useDispatch} from "react-redux";
import actions from "../../store/actions";

export interface ApproveToPoolProps {
  data?: Token;
}
export function ApproveToPool({data}: ApproveToPoolProps): React.ReactElement {
  const dispatch = useDispatch();
  const [numValue, setNumValue] = useState(0);

  if (data === undefined) return <LoadingView />;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setNumValue(parseInt(value));
  }
  const onSubmit = () => {
    console.log("Submitted");
    dispatch(actions.tokens.approve(data.address, numValue));

  };
  return (
    <Card>
      <Card.Header>Allowance</Card.Header>
      <Card.Body>
        <p>Your current allowance: {data.allowance}<br/></p>
        <Form>
          <Form.Control
            type={"numerical"}
            value={numValue}
            style={{textAlign: "right"}}
            onChange={onChange}
          ></Form.Control>
          <Button onClick={onSubmit}>Approve</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
