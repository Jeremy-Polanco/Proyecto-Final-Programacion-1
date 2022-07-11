import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/index";
import { Error, Home, Login, Register } from "./pages";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
