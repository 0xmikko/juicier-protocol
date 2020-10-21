import React from 'react';
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";

interface AppBarElementProps {
  title: string;
  to: string;
}

export const AppBarElement: React.FC<AppBarElementProps> = ({
  title,
  to,
}: AppBarElementProps) => {
  return (
    <Nav className="nav-item" >
      <Link to={to}>
          <a style={{cursor: "pointer"}}>{title}</a>
      </Link>
    </Nav>
  );
};
