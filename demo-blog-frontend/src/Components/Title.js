import React from "react";
import ReactLogo from "./ReactLogo";
import SpringLogo from "./SpringLogo";
import RestApiLogo from "./RestApiLogo";

const Title = () => {
  return (
    <div className="btn" style={{ cursor: "default" }}>
      <h1>
        <span
          className="ms-1"
          style={{
            fontWeight: "bold",
            textShadow: "2px 2px 3px rgb(150, 150, 150)",
          }}
        >
          demo.
        </span>
        <ReactLogo />
        <span
          className="me-2"
          style={{
            color: "#61dafb",
            textShadow: "2px 2px 3px rgb(0,88,121)",
          }}
        >
          React
        </span>
        <SpringLogo />
        <span
          className="ms-1 me-2"
          style={{
            color: "rgba(119,188,31)",
            textShadow: "2px 2px 3px rgb(49,118,0)",
          }}
        >
          spring boot
        </span>
        <RestApiLogo />
        <span
          className="ms-1"
          style={{
            fontWeight: "bold",
            textShadow: "2px 2px 3px rgb(150, 150, 150)",
          }}
        >
          .blog
        </span>
      </h1>
    </div>
  );
};

export default Title;
