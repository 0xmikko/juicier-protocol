import React from "react";
import {Col, Container, Media, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import CookieConsent from "react-cookie-consent";

export function Footer() {
  return (
    <footer className={"footer-container"}>
      <CookieConsent
        location="bottom"
        buttonText="Yes, I consent"
        cookieName="cookieConsent"
        style={{background: "#2B373B"}}
        buttonStyle={{
          color: "#4e503b",
          fontSize: "16px",
          minWidth: "150px",
          borderRadius: "5px",
        }}
        buttonWrapperClasses={"consent-button"}
        expires={150}
      >
        🍪 We need to talk about cookies! 🍪
        <br />
        <span style={{fontSize: "13px", lineHeight: 1}}>
          Juicer Protocol and its partners use cookies to operate the website
          and platform, for analytical purposes, and for advertising/targeting
          purposes. You can learn more about our use of cookies in Our Privacy
          Policy. Using cookies helps us provide a better experience tailored to
          your needs. By clicking “Yes, I consent” below, you agree to our use
          of analytics and advertising/targeting cookies. You can opt out of our
          use of certain cookies at any time by following the instructions in
          Our Privacy Policy.
        </span>
      </CookieConsent>
      <div className={"footer-content"} style={{color: "white"}}>
        <Container style={{paddingTop: '30px', paddingBottom: "30px"}}>
            <Media>
              <Link to="/">
                <img
                  src={"/logo.png"}
                  height={50}
                  alt={"Logo"}
                  style={{marginBottom: "15px"}}
                />
              </Link>
              <Media.Body style={{marginLeft: "30px"}}>
              <p>
                &copy; Copyright 2020 Juicer Protocol
                <br />
                All rights reserved
              </p>
              </Media.Body>
            </Media>
        </Container>
      </div>
    </footer>
  );
}
