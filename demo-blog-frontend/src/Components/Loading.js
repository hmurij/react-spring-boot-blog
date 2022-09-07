import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="w-auto d-flex align-content-center text-secondary">
      <Spinner
        as="span"
        animation="border"
        size="lg"
        role="status"
        aria-hidden="true"
      />
      <span className="ms-1">
        <h3>Loading...</h3>
      </span>
    </div>
  );
};

export default Loading;
