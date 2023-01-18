import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MapView from "./pages/MapView";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

// App function and path to all pages/routes
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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
