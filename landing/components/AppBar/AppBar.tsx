/*
 * Lean tool - hypothesis testing application
 * Copyright (c) 2020. Mikhail Lazarev
 */

import React from "react";
import { Nav, Navbar, Button, Container } from "react-bootstrap";
import Link from "next/link";

import { AppBarElement } from "./AppBarElement";

export interface AppBarProps {
  backgroundColor?: string;
}

export const AppBar = ({ backgroundColor }: AppBarProps) => {
  return (
    <Navbar
      bg="light"
      expand="md"
      style={{ backgroundColor: `${backgroundColor || "EEE"}!important` }}
    >
      <Container>
        <Navbar.Brand>
          <Link href="/">
            <img src={"/logo.png"} alt={"Logo"} className={"navbar-image"} style={{cursor: "pointer"}}/>
          </Link>
        </Navbar.Brand>

        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ justifyContent: "center" }}
        >
          <AppBarElement title="About" to="/about" key="about" />
          <AppBarElement title="Vitamin token" to="/vitamins" key="cases" />
          <AppBarElement title="Github" to="https://github.com/MikaelLazarev/juicifi" key="github" />
        </Navbar.Collapse>
        <Navbar style={{ justifyContent: "right" }}>
          <a
            href={"https://app.juicer.finance"}
            style={{ color: "black" }}
            className={"appbar-login"}
          >
            <Nav className="nav-item">Enter market</Nav>
          </a>

        </Navbar>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default AppBar;
