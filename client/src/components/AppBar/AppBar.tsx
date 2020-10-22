/*
 * Lean tool - hypothesis testing application
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from "react";
import {Nav, Navbar, Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

import {AppBarElement} from "./AppBarElement";
import {useSelector} from "react-redux";
import {web3Selector} from "../../store/web3";
import * as blockies from 'blockies-ts';


export interface AppBarProps {
  backgroundColor?: string;
}

export const AppBar = ({backgroundColor}: AppBarProps) => {

  const accounts = useSelector(web3Selector).accounts;
  const address = accounts.length >0 ? accounts[0] : "";
  const imgSrc = blockies.create({ seed: address }).toDataURL();

  return (
    <Navbar
      bg="light"
      expand="md"
      style={{backgroundColor: `${backgroundColor || "EEE"}!important`}}
    >
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              src={"/logo.png"}
              alt={"Logo"}
              className={"navbar-image"}
              style={{cursor: "pointer"}}
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{justifyContent: "center"}}
        >
          <AppBarElement title="Markets" to="/markets" key="markets" />
          <AppBarElement title="Deposits" to="/deposits" key="deposits" />
          <AppBarElement title="Loans" to="/loans" key="loans" />
          <AppBarElement title="Vitamins" to="/vitamins" key="vitamins" />
        </Navbar.Collapse>
        <Navbar style={{justifyContent: "right"}}>
          <a
            href={"/login"}
            style={{color: "black"}}
            className={"appbar-login"}
          >
            <Nav className="nav-item">
              <img src={imgSrc} style={{ borderRadius: "50%"}}/>
            </Nav>
          </a>
        </Navbar>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default AppBar;
