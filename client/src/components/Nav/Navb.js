import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from "mdb-react-ui-kit";

function Navb() {
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const Adminauth = localStorage.getItem("admin");
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const logoutAdmin = () => {
    localStorage.clear();
    navigate("/admin");
  };
  return (
    <div>
      <>
        <MDBNavbar expand="lg" dark bgColor="dark">
          <MDBContainer fluid>
            {auth ? (
              <>
                <MDBNavbarBrand href="#">User</MDBNavbarBrand>
                <MDBNavbarToggler
                  type="button"
                  data-target="#navbarColor02"
                  aria-controls="navbarColor02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => setShowNavColorSecond(!showNavColorSecond)}>
                  <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse
                  show={showNavColorSecond}
                  navbar
                  id="navbarColor02">
                  <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                    <MDBNavbarItem className="active"></MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink href="#">
                        <Link onClick={logout} to="/login">
                          Logout
                        </Link>
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </>
            ) : Adminauth ? (
              <>
                <MDBNavbarBrand href="#">
                  <Link to="/adminhome">Admin-Home</Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler
                  type="button"
                  data-target="#navbarColor02"
                  aria-controls="navbarColor02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => setShowNavColorSecond(!showNavColorSecond)}>
                  <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse
                  show={showNavColorSecond}
                  navbar
                  id="navbarColor02">
                  <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                    <MDBNavbarItem className="active"></MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink href="#">
                        <Link to="adduser">Add-User</Link>
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink href="#">
                        <Link to="edituser">Edit-User</Link>
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <MDBNavbarLink href="#">
                        <Link onClick={logoutAdmin} to="/admin">
                          Logout
                        </Link>
                      </MDBNavbarLink>
                    </MDBNavbarItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </>
            ) : (
              <>
                <MDBNavbarBrand href="#">User-Management</MDBNavbarBrand>
                <MDBNavbarToggler
                  type="button"
                  data-target="#navbarColor02"
                  aria-controls="navbarColor02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => setShowNavColorSecond(!showNavColorSecond)}>
                  <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse
                  show={showNavColorSecond}
                  navbar
                  id="navbarColor02">
                  <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                    <MDBNavbarItem className="active"></MDBNavbarItem>
                    <MDBNavbarItem></MDBNavbarItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </>
            )}
          </MDBContainer>
        </MDBNavbar>
      </>
    </div>
  );
}

export default Navb;
