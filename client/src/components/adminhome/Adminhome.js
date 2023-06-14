import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBCol,
} from "mdb-react-ui-kit";
import "./Adminhome.css";
import { baseUrlAdmin } from "../../Constants/Constant";
import { Link } from "react-router-dom";

export default function Adminhome() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`${baseUrlAdmin}user`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setUser(result);
  };

  const deleteUser = async (id) => {
    console.warn(id);
    let result = await fetch(`${baseUrlAdmin}user/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHAndle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`${baseUrlAdmin}search/${key}`);
      result = await result.json();

      if (result) {
        setUser(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="container Adminhome">
      <MDBCol className="search" md="6">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={searchHAndle}
        />
      </MDBCol>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {user.length > 0 ? (
            user.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <MDBBtn className="me-1" color="primary">
                    <Link className="btntxt" to={"/edituser/" + item._id}>
                      Edit user
                    </Link>
                  </MDBBtn>
                  <MDBBtn
                    className="editbtn"
                    color="danger"
                    onClick={() => deleteUser(item._id)}>
                    Delete
                  </MDBBtn>
                </td>
              </tr>
            ))
          ) : (
            <h1 className="nores">No results found</h1>
          )}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
