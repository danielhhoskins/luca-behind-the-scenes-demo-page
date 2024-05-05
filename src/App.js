import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import AnalysisPage from "./AnalysisPage";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
         </Routes>
      </Router>
   );
}

export default App;
