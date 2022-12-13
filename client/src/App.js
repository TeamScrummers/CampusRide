import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Register from "./pages/Register";
import MapView from "./pages/MapView";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/register" element={<Register />} />
          <Route path="/MapView" element={<MapView />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Landing" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
