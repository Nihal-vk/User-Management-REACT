import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./Admin.css";

function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const adminlogin = async () => {
    let result = await fetch("http://localhost:3001/admin/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (result.ok) {
      if (data.admin) {
        localStorage.setItem("admin", JSON.stringify(data));
        navigate("/adminhome");
      } else {
        alert("enter correct details");
      }
    }
  };

  return (
    <div className="container Admin">
      <MDBContainer fluid className="p-3 my-5">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              value={username}
              type="email"
              onChange={(e) => setUsername(e.target.value)}
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
            />

            <MDBBtn onClick={adminlogin} className="mb-4 w-100" size="lg">
              Sign in
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Admin;
