import React, { useEffect, useState } from "react";
import "./TrangChu.css";
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
    window.location.href = "/dangkihocphan";
  };

  return (
    <div className="body">
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
                <span type="text"> {noiSinh} </span>
              </td>
              <td>
                <label>Loại đào tạo: </label>
                <span type="text"> {loaiDT} </span>
              </td>
            </tr>
            <tr className="row">
              <td>
                <label>Nơi sinh: </label>
                <span type="text"> {ns} </span>
              </td>
              <td>
                <label>Ngành: </label>
                <span type="text"> {nganh} </span>
              </td>
            </tr>
            <tr style={{ textAlign: "right" }}>
              <td>
                <button className="btn" type="button" onClick={handleSignUp}>
                  Đăng kí học phần
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
export default TrangChu;
