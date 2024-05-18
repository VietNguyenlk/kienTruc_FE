import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DangKiHocPhan from "./screen/DangKiHocPhan";
import DangNhap from "./screen/dangnhap/DangNhap";
import TrangChu from "./screen/trangchu/TrangChu";
import TrangThoiKhoaBieu from "./screen/thoikhoabieu/TrangThoiKhoaBieu";
import TrangDiem from "./screen/diem/TrangDiem";
function App() {

  return (
      <Router>
        <Routes>
          <Route path="/trangchu" element={<TrangChu />} />
          <Route path="/" element={<DangNhap />} />
          <Route path="/dangkihocphan" element={<DangKiHocPhan />} />
          <Route path="/thoikhoabieu" element={<TrangThoiKhoaBieu />} />
          <Route path="/diemmonhoc" element={<TrangDiem />} />
        </Routes>
      </Router>
      
    )
}

export default App;