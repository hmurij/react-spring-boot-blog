import React from "react";
import { Col, Container, Row } from "react-bootstrap";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  resizeHandler() {
    const height = this.header.clientHeight;
    this.setState({ height });
    this.props.onHeightChange(height);
  }

  componentDidMount() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  render() {
    return (
      <Container
        fluid
        className="fixed-bottom border-top bg-light"
        ref={(footer) => {
          this.header = footer;
        }}
      >
        <Row>
          <Col>
            <p className="text-center text-nowrap pt-3">
              &copy; 2022 MyCompany, Inc
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
