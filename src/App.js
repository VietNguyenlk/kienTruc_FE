import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DangKiHocPhan from "./screen/DangKiHocPhan";
function App() {
  return (
      <Router>
        <Routes>
          
          <Route path="/dangkihocphan" element={<DangKiHocPhan />} />
        </Routes>
      </Router>
  );
}

export default App;