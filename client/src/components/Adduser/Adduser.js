import React, { useState } from "react";
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
import "./Adduser.css";
import { useNavigate } from "react-router-dom";

function Adduser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const addUser = async () => {
    if (!name || !email || !password) {
      setError(true);
      return false;
    }

    console.log(name, password, email);
    let result = await fetch("http://localhost:3001/admin/adduser", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/adminhome");
  };
  return (
    <div className="conatiner adduser">
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <div className="cardmod">
                <MDBCol
                  md="10"
                  lg="6"
                  className="order-2 order-lg-1 d-flex flex-column align-items-center">
                  <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Add User
                  </p>

                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                      label="Your Name"
                      id="form1"
                      type="text"
                      className="w-100"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  {error && !name && (
                    <span className="errormsg">Enter Valid name</span>
                  )}

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Your Email"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      label="Password"
                      id="form3"
                      type="password"
                    />
                  </div>
                  {error && !password && (
                    <span className="errormsg">Enter Valid password</span>
                  )}

                  <MDBBtn onClick={addUser} className="mb-4" size="lg">
                    Add
                  </MDBBtn>
                </MDBCol>
              </div>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Adduser;
