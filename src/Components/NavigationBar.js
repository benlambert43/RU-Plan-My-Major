import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ViewClasses from "./ViewClasses";
import Checkout from "./Checkout";
import Main from "./Main";
import logo from "../logo192.png";
import { Navbar } from "react-bootstrap";
import Login from "./Login";
import { GoogleLogin } from "react-google-login";

function NavigationBar() {
  const [firstName, setFirstName] = useState("");
  const [responseObject, setResponseObject] = useState({ GoogleObject: {} });

  const responseGoogle = response => {
    //console.log(response);
    setFirstName(response.profileObj.name);
    setResponseObject(response);
  };

  const APIKey = process.env.REACT_APP_GOOGLESSO_API_KEY;
  const fullKey = APIKey + ".apps.googleusercontent.com";

  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <div className="collpase navbar-collapse">
            <Navbar.Brand>
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Navbar.Brand>
            <Link to="/" className="navbar-brand">
              RU Plan My Major
            </Link>

            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/viewclasses" className="nav-link">
                  Open Classes by Department
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/checkout" className="nav-link">
                  Register My Classes
                </Link>
              </li>
            </ul>
          </div>

          <Navbar.Text className="justify-content-end">
            {firstName ? (
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">
                    Hello, {firstName}
                  </Link>
                </li>
              </ul>
            ) : (
              <GoogleLogin
                clientId={fullKey}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            )}
          </Navbar.Text>
        </Navbar>
        <Route
          path="/"
          exact
          render={() => <Main responseObject={responseObject} />}
        />
        <Route
          path="/viewclasses"
          render={() => <ViewClasses responseObject={responseObject} />}
        />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/login" exact component={Login} />
      </div>
    </Router>
  );
}

export default NavigationBar;
