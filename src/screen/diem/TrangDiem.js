import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import "./TrangDiem.css";

const csvData = `
maMonHoc,tenMonHoc,diemLT1,diemLT2,diemLT3,diemLT4,diemLT5,diemTH1,diemTH2,diemTH3,diemTH4,diemTH5,diemGK,diemCK,diemTongKet,diem4,diemChu,xepLoai,dat
MTH101,Toán cao cấp,8,7,6,9,8,8,8,7,9,8,7.5,8,7.5,3.5,B+,Khá,Đạt
PHY101,Vật lý đại cương,7,6,7,8,9,8,7,6,7,8,7.0,7.5,7.2,3.2,B,Khá,Đạt
`;

function TrangDiem() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  return (
    <div className="body">
      <h1>Điểm môn học</h1>
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
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.maMonHoc}</td>
              <td>{row.tenMonHoc}</td>
              <td>{row.diemLT1}</td>
              <td>{row.diemLT2}</td>
              <td>{row.diemLT3}</td>
              <td>{row.diemLT4}</td>
              <td>{row.diemLT5}</td>
              <td>{row.diemTH1}</td>
              <td>{row.diemTH2}</td>
              <td>{row.diemTH3}</td>
              <td>{row.diemTH4}</td>
              <td>{row.diemTH5}</td>
              <td>{row.diemGK}</td>
              <td>{row.diemCK}</td>
              <td>{row.diemTongKet}</td>
              <td>{row.diem4}</td>
              <td>{row.diemChu}</td>
              <td>{row.xepLoai}</td>
              <td>{row.dat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrangDiem;
