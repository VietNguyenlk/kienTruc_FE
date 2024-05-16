import React from "react";
import "./TrangDiem.css";

function TrangDiem() {
  return (
    <div className="body">
      <tr>
        <h1>Điểm môn học</h1>
      </tr>
      <table className="table">
        <thead>
          <tr>
            <th rowSpan="0">STT</th>
            <th rowSpan="0">Mã môn học</th>
            <th rowSpan="0">Tên môn học</th>
            <th colSpan="5">Điểm lí thuyết</th>
            <th colSpan="5">Điểm thực hành</th>
            <th rowSpan="0">Điểm GK</th>
            <th rowSpan="0">Điểm CK</th>
            <th rowSpan="0">Điểm tổng kết</th>
            <th rowSpan="0">Điểm 4</th>
            <th rowSpan="0">Điểm chữ</th>
            <th rowSpan="0">Xếp loại</th>
            <th rowSpan="0">Đạt</th>
          </tr>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}
export default TrangDiem;
