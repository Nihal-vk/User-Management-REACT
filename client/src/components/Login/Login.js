import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./Login.css";
import { userLogin } from "../../Redux/Username";
import { baseUrl } from "../../Constants/Constant";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    let result = await fetch(`${baseUrl}login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.auth) {
      dispatch(userLogin({ userData: result.name }));
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("enter correct details");
    }
  };
  return (
    <div className="container login">
      <MDBContainer fluid className="p-3 my-5 h-custom ">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <div className="d-flex flex-row align-items-center justify-content-center"></div>

            <div className="divider d-flex align-items-center my-4"></div>

            <MDBInput
              wrapperClass="mb-4"
              onChange={(e) => setEmail(e.target.value)}
              label="Email address"
              id="formControlLg"
              type="email"
              value={email}
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              id="formControlLg"
              value={password}
              type="password"
              size="lg"
            />

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-0 px-5" onClick={handleLogin} size="lg">
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a href="#!" className="link-danger">
                  <Link to="/signup">Register</Link>
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>

        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>

          <div></div>
        </div>
      </MDBContainer>
    </div>
  );
}

export default Login;
