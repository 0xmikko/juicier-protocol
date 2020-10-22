import React from "react";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

export function Web3Connect(): React.ReactElement {
  return (
    <Container className={"onescreen"} style={{flexDirection: "column"}}>
        <img
            src={"/logo.png"}
            alt={"Logo"}
            style={{height: "120px"}}
        />
      <h5 style={{marginTop: "40px"}}>Please, connect Metamask or other Web3 provider to continue.</h5>
    </Container>
  );
}
