import React from 'react';
import Link from 'next/link'
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
      <Link href={to}>
          <a style={{cursor: "pointer"}}>{title}</a>
      </Link>
    </Nav>
  );
};
