import React from "react";
import "./ThoiKhoaBieu.css";
import ThoiKhoaBieu from "./ThoiKhoaBieu";

function TrangThoiKhoaBieu() {
  return (
    <div className="body">
      <h1>Thời khóa biểu</h1>
        <tr  style={{width:"100%", textAlign:"end"}}>
          <button className="btnTKB" style={{width:"10%", margin:"2px"}}>Tuần tiếp</button>
          <button className="btnTKB" style={{width:"10%", margin:"2px"}}>Tuần trước</button>
        </tr>
        <ThoiKhoaBieu></ThoiKhoaBieu>
    </div>
  );
}

export default TrangThoiKhoaBieu;
