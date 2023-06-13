import "./App.css";
import Navb from "./components/Nav/Navb";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Admin from "./components/Admin/Admin";
import PrivateComponent from "./components/Private/PrivateComponent";
import Adminhome from "./components/adminhome/Adminhome";
import Admincomponent from "./components/Private/Admincomponent";
import Adduser from "./components/Adduser/Adduser";
import Edituser from "./components/Edituser/Edituser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navb />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
          <Route element={<Admincomponent />}>
            <Route path="/adminhome" element={<Adminhome />} />
            <Route path="/adduser" element={<Adduser />} />
            <Route path="/edituser/:id" element={<Edituser />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
