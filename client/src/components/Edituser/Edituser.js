import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import "./Edituser.css";

function Edituser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    let result = await fetch(`http://localhost:3001/admin/user/${params.id}`);
    result = await result.json();
    setName(result.name);
    setEmail(result.email);
    setPassword(result.password);
  };

  const editUser = async () => {
    console.log(name, password, email);
    let result = await fetch(`http://localhost:3001/admin/user/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = result.json();
    if (result) {
      navigate("/adminhome");
    }
  };

  return (
    <div className="edituser">
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
                    Edit user
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

                  <MDBBtn onClick={editUser} className="mb-4" size="lg">
                    Save
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

export default Edituser;
