import React from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { withTranslation } from "react-i18next";
import Title from "../Title";

class Header extends React.Component {
  static contextType = AuthContext;
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

  logoutHandler = () => {
    // console.log("logging out from header");
    this.context.logout();
  };

  render() {
    let { isLoggedIn, userName } = this.context;
    const { t, i18n } = this.props;

    return (
      <Container
        fluid
        className="fixed-top border-bottom text-center bg-white boxShadow"
        ref={(header) => {
          this.header = header;
        }}
      >
        <Navbar bg="white" expand="sm">
          <Container fluid>
            <Navbar.Brand to="/" as={NavLink}>
              {t("home")}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  style={{ boxShadow: "2px 2px 5px grey" }}
                >
                  {t("languages")}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => i18n.changeLanguage("lt")}>
                    {t("lt")}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => i18n.changeLanguage("en")}>
                    {t("en")}{" "}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {isLoggedIn && (
                <Nav className="d-flex w-100">
                  <Link
                    className="me-auto button btn btn-outline-secondary ms-1 my-2 text-decoration-none"
                    to="/new-post"
                    as={NavLink}
                  >
                    {t("newPost")}
                  </Link>
                  <div
                    className="btn align-self-center text-secondary"
                    style={{ cursor: "default" }}
                  >
                    <span>{`${t("signedInAs")}:  ${userName}`}</span>
                  </div>
                  <Link
                    className="button btn btn-outline-secondary me-1 my-2 text-decoration-none"
                    to="/"
                    as={NavLink}
                    onClick={this.logoutHandler}
                  >
                    {t("logout")}
                  </Link>
                </Nav>
              )}

              {!isLoggedIn && (
                <Nav className="d-flex w-100 justify-content-end">
                  <Link
                    className="button btn btn-outline-secondary me-1 my-1 text-decoration-none"
                    to="/login"
                    as={NavLink}
                  >
                    {t("login")}
                  </Link>
                  <Link
                    className="button btn btn-outline-secondary me-1 my-1 text-decoration-none"
                    to="/register"
                    as={NavLink}
                  >
                    {t("register")}
                  </Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Title />
      </Container>
    );
  }
}

export default withTranslation()(Header);
