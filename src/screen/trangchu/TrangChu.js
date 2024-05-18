import React, { useEffect, useState } from "react";
import "./TrangChu.css";
import NestedCircles from "./NestedCircles"; // Import NestedCircles
import { getApiUser } from "../../api/Api.js";

function TrangChu() {
  // Lấy mã sinh viên từ URL
  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };
  const maSV = getQueryParam("maSV");

  const [ten, setTen] = useState("");
  const [gt, setGt] = useState("");
  const [ns, setNs] = useState("");
  const [noiSinh, setNoiSinh] = useState("");
  const [lop, setLop] = useState("");
  const [khoa, setKhoa] = useState("");
  const [bacDT, setBacDT] = useState("");
  const [loaiDT, setLoaiDT] = useState("");
  const [nganh, setNganh] = useState("");

  useEffect(() => {
    const loadInfor = async () => {
      try {
        console.log("maSV:", maSV); // Log giá trị maSV
        const res = await getApiUser(`/getSVbyMaSV/${maSV}`, { id: maSV });
        setLop(res.data.data.lop);
        setTen(res.data.data.tenSV);
        setGt(res.data.data.gioiTinh);
        setNs(res.data.data.ngaySinh);
        setNoiSinh(res.data.data.noiSinh);
        setKhoa(res.data.data.khoaHoc);
        setBacDT(res.data.data.bacDaoTao);
        setLoaiDT(res.data.data.loaiHinhDaoTao);
        setNganh(res.data.data.nganh);
      } catch (error) {
        console.error("Error while fetching data:", error);
        alert("Error while fetching data: " + error.message);
      }
    };
    if (maSV) {
      loadInfor();
    }
  }, [maSV]);

  const handleSignUp = () => {
    window.location.href = `/dangkihocphan?maSV=${maSV}`;
    ///trangchu?maSV=${maSV}
  };

  const handlePlan = () => {
    window.location.href = `/thoikhoabieu?maSV=${maSV}`;
  };

  const handlePoint = () => {
    window.location.href = "/diemmonhoc";
  };

  const handleCongNo = () => {
    alert("Chức năng đang được phát triển");
  }

  const handleNhacNho = () => {
    alert("Chức năng đang được phát triển");
  }

  return (
    <div className="body" style={{ display: "flex", alignItems: "baseline", overflow:"scroll" }}>
      <div className="container">
        <div className="containLeft">
          <div className="containLeftTop">
            <h3>THÔNG TIN SINH VIÊN</h3>
          </div>
          <div className="containLeftBottom">
            <div className="avatar"></div>
          </div>
        </div>
        <div className="containRight">
          <table style={{ width: "100%", height: "100%" }}>
            <tr className="row">
              <td>
                <label>MSSV: </label>
                <span type="text"> {maSV}</span>
              </td>
              <td>
                <label>Lớp học: </label>
                <span type="text"> {lop}</span>
              </td>
            </tr>
            <tr className="row">
              <td>
                <label>Họ và tên: </label>
                <span type="text"> {ten} </span>
              </td>
              <td>
                <label>Khoá học: </label>
                <span type="text"> {khoa} </span>
              </td>
            </tr>
            <tr className="row">
              <td>
                <label>Giới tính: </label>
                <span type="text">{gt}</span>
              </td>
              <td>
                <label>Bậc đào tạo: </label>
                <span type="text"> {bacDT} </span>
              </td>
            </tr>
            <tr className="row">
              <td>
                <label>Ngày sinh: </label>
                <span type="text"> {ns} </span>
              </td>
              <td>
                <label>Loại đào tạo: </label>
                <span type="text"> {loaiDT} </span>
              </td>
            </tr>
            <tr className="row">
              <td>
                <label>Nơi sinh: </label>
                <span type="text"> {noiSinh} </span>
              </td>
              <td>
                <label>Ngành: </label>
                <span type="text"> {nganh} </span>
              </td>
            </tr>
          </table>
        </div>
        <div className="containPlan">
          <h4 style={{fontSize:"22px"}}>TIẾN ĐỘ HỌC TẬP</h4>
          <NestedCircles innerPercent={80} outerPercent={156} /> 
        </div>
      </div>
      <div className="footer">
      <button
            style={{ margin: "5px" }}
            className="btn"
            type="button"
            onClick={handlePlan}
          >
            Lịch học
          </button>
          <button
            style={{ margin: "5px" }}
            className="btn"
            type="button"
            onClick={handlePoint}
          >
            Điểm môn học
          </button>
          <button
            style={{ margin: "5px" }}
            className="btn"
            type="button"
            onClick={handleSignUp}
          >
            Đăng kí học phần
          </button>
          <button onClick={handleCongNo} style={{ margin: "5px" }} className="btn" type="button">
            Tra cứu công nợ
          </button>
          <button onClick={handleNhacNho} style={{ margin: "5px" }} className="btn" type="button">
            Nhắc nhở
          </button>
      </div>
    </div>
  );
}
export default TrangChu;
