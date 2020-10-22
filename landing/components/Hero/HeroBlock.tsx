import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import styles from "./Hero.module.css";
import {Analytics} from "rc-analytics";

export function HeroBlock() {
  const onRegister = async () => {
    await Analytics.sendEvent("ENTER", "REGISTER PRESSED");
    window.location.href = 'https://app.juicer.finance';
  };

  return (
    // <Container>
    <Container fluid className={styles.hero_background}>
      <Container fluid className={styles.hero_inside}>
              {/*<img src="/logo.png" style={{height: "70px"}}/>*/}
              <h1 className={"m-t-10 responsive"} style={{color: "#e8eeba"}}>THE LENDING BROKER PROTOCOL</h1>
              <p  style={{color: "#e8eeba"}}>
                  Juicer is an open source and non-custodial protocol providing better interest rates for both borrowers & lenders.
              </p>
              <div style={{marginTop: "15px"}}>
                <Button
                  type={"submit"}
                  className={"formButton"}
                  onClick={onRegister}
                >
                  Enter
                </Button>
              </div>
      </Container>
    </Container>
  );
}
