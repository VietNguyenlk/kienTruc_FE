import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DangKiHocPhan from "./screen/DangKiHocPhan";
import DangNhap from "./screen/DangNhap";
import TrangChu from "./screen/TrangChu";
function App() {

  return (
      <Router>
        <Routes>
          <Route path="/trangchu" element={<TrangChu />} />
          <Route path="/" element={<DangNhap />} />
          <Route path="/dangkihocphan" element={<DangKiHocPhan />} />
        </Routes>
      </Router>
      
    )
}

export default App;