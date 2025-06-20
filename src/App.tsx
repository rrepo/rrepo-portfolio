// src/App.tsx
import "./App.css";
import Top from "./pages/Top";
import Works from "./pages/Works";
import Test from "./pages/Test";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/works" element={<Works />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}
export default App;