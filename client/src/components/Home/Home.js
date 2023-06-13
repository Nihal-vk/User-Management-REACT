import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Redux/Username";


function Home() {
  const dispatch =useDispatch()
  // let auth;
  // let name;

  // try {
  //   auth = localStorage.getItem("user");
  //   name = auth ? JSON.parse(auth).name : null;
  // } catch (error) {
  //   console.error("Error parsing JSON:gigig", error);
  //   name = null;
  // }
  useEffect(()=>{
    const auth = localStorage.getItem("user");
    const name = auth ? JSON.parse(auth).name : null;
    dispatch(userLogin({userData:name}))
  },[])
  const userdata = useSelector((state)=>state.userData.value)
  console.log(userdata);
  return (
    <div className="container header">
      <header>
        <div
          id="intro-example"
          className="p-5 text-center bg-image header"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/new/slides/041.webp')",
          }}>
          <div
            className="mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
                <h1 className="mb-3">Welcome {userdata} </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
