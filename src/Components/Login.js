import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faHardHat } from "@fortawesome/free-solid-svg-icons";

function Login() {
  return (
    <Container fluid="true">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 100
        }}
      >
        <h1>
          <FontAwesomeIcon icon={faWrench} color="orange" />
          <b> Login Under Construction </b>
          <FontAwesomeIcon icon={faHardHat} color="orange" />
        </h1>
      </div>
    </Container>
  );
}

export default Login;
