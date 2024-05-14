import React, { useState } from "react";
import "./DangNhap.css";
import { postApiUser } from "../../api/Api";
function DangNhap() {
  const [maSV, setMaSV] = useState("");
  const [matKhau, setMatKhau] = useState("");

  const changeMaSV = (e) => {
    setMaSV(e.target.value);
  };
  const changePass = (e) => {
    setMatKhau(e.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await postApiUser("/loginUser", {
        maSV: maSV,
        password: matKhau,
      });
      if (response.data.status === "OK") {
        alert("Đăng nhập thành công");
        window.location.href = "/trangchu";
      } else {
        alert("Đăng nhập thất bại");
        setMaSV("");
        setMatKhau("");
      }
    } catch (error) {
      console.error("Error while fetching token:", error);
      alert("Error while fetching token: " + error.message);
    }
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr style={{ width: "100%" }}>
            <td colSpan="2" style={{ textAlign: "center" }}>
              <h3>ĐĂNG KÍ HỌC PHẦN</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label htmlFor="maSV">Mã sinh viên</label>
            </td>
            <td>
              <input type="text" value={maSV} id="maSV" name="maSV" onChange={changeMaSV} />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="password">Mật khẩu</label>
            </td>
            <td>
              <input
                type="password"
                id="password"
                name="password"
                value={matKhau}
                onChange={changePass}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td style={{ textAlign: "right" }}>
              <button type="button" onClick={handleSignIn}>
                Đăng nhập
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DangNhap;
