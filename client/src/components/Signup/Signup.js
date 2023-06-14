import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./Signup.css";
import { baseUrl } from "../../Constants/Constant";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const SignUP = async () => {
    if (!name || !email || !password) {
      setError(true);
      return false;
    }
    console.warn(name, email, password);
    let result = await fetch(`${baseUrl}signUp`, {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
  };
  return (
    <div className="signup">
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center">
                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Your Name"
                    id="form1"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-100"
                  />
                </div>
                {error && !name && (
                  <span className="errormsg">Enter Valid name</span>
                )}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="form2"
                    type="email"
                  />
                </div>
                {error && !email && (
                  <span className="errormsg">Enter Valid Email</span>
                )}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="form3"
                    type="password"
                  />
                </div>
                {error && !password && (
                  <span className="errormsg">Enter Valid password</span>
                )}

                <MDBBtn onClick={SignUP} className="mb-4" size="lg">
                  Register
                </MDBBtn>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Signup;
