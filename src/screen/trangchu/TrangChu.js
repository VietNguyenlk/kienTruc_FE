import React from "react";
import "./TrangChu.css";

function TrangChu(maSV) {
  // const [matKhau, setMatKhau] = useState("");
  // const [ten, setTen] = useState("");
  // const [gt, setGt] = useState("");
  // const [ns, setNs] = useState("");
  // const [noiSinh, setNoiSinh] = useState("");
  // const [lop, setLop] = useState("");
  // const [khoa, setKhoa] = useState("");
  // const [bacDT, setBacDT] = useState("");
  // const [loaiDT, setLoaiDT] = useState("");
  // const [nganh, setNganh] = useState("");

  const handleSignUp = () => {
    window.location.href = "/dangkihocphan";
  }

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
              <td><label>MSSV: </label>
                <span type="text" /></td>
              <td><label>Lớp học: </label>
                <span type="text" /></td>
            </tr>
            <tr className="row">
              <td><label>Họ và tên: </label>
              <span type="text" /></td>
              <td><label>Khoá học: </label>
              <span type="text" /></td>
            </tr>
            <tr className="row">
              <td><label>Giới tính: </label>
              <span type="text" /></td>
              <td><label>Bậc đào tạo: </label>
              <span type="text" /></td>
            </tr>
            <tr className="row">
              <td><label>Ngày sinh: </label>
              <span type="text" /></td>
              <td><label>Loại đào tạo: </label>
              <span type="text" /></td>
            </tr>
            <tr className="row">
              <td><label>Nơi sinh: </label>
              <span type="text" /></td>
              <td><label>Ngành: </label>
              <span type="text" /></td>
            </tr>
            <tr style={{ textAlign: "right" }}>
              <td>
                <button className="btn" type="button" onClick={handleSignUp}>Đăng kí học phần</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
export default TrangChu;
