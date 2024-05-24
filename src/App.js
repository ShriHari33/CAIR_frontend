import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
// import Service from "./Components/Service";
import Signin from "./Components/Signin";
import Login from "./Components/Login";
import First from "./Components/First";
import Addproject from "./Components/Addproject";
import Navbar from "./Components/Navbar";
import Edit from "./Components/Edit";
import Adddoc from "./Components/Adddoc";
import Projectdet from "./Components/Projectdet";
import Dashboard from "./Components/Dashboard";
import Publications from "./Components/Publications";



function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          {/* <Route path="/Service" element={<Service/>} /> */}
          <Route path="/fetchResearchPapers" element={<Publications />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/First" element={<First />} />
          <Route path="/Addproject" element={<Addproject />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Adddoc/:cairId/projects/:projectIndex" element={<Adddoc />} />
          <Route path="/cair/:cairId/projects/:projectIndex" element={<Edit />} />
          <Route path="/cairdet/:cairId/projects/:projectIndex" element={<Projectdet />} />
          <Route path="/Dashboard" element={<Dashboard />} />


        </Routes>

      </Router>
    </div>
  );
}

export default App;
