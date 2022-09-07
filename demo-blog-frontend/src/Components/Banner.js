import React from "react";
import { Col } from "react-bootstrap";

const Banner = ({ message, className }) => {
  return (
    <Col sm={10} md={8} lg={6} className="align-self-center">
      <div
        className={`p-4 text-center border rounded-3 boxShadow ${className}`}
      >
        {message}
      </div>
    </Col>
  );
};

export default Banner;
