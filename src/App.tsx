import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "@/styles/App.css";
import "@/styles/font.css";
import "@/styles/index.css";

import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Application */}
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
