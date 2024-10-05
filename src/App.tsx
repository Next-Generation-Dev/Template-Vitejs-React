import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MetaTags from "./component/Utils/MetaTags";

import "@/styles/App.css";
import "@/styles/font.css";
import "@/styles/index.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <MetaTags />
      <Router>
        <Routes>
          {/* Application */}
          <Route path="/" element={<Home />} />

          {/* 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
