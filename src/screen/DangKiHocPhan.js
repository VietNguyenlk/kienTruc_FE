import React, { useEffect, useState } from "react";
import "../App.css";
import { getApiLHP, getApiNoneToken, postApiLHP } from "../api/Api";

function DangKiHocPhan() {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [selectedLHPIndex, setSelectedLHPIndex] = useState(null);
  const [listSubject, setListSubject] = useState([]);
  const [listLHP, setListLHP] = useState([]);
  const [listLHPBySv, setListLHPBySv] = useState([]);
  const maSV = "20000001";

  const subjectCounter = 1;

  useEffect(() => {
    const fetchListSubject = async () => {
      try {
        console.log("listSubject");
        const res = await getApiNoneToken(
          "http://localhost:3001/api/monhoc/getListSubject"
        );
        console.log("mon hoc", res.data.data);
        setListSubject(res.data.data);
      } catch (error) {
        console.log("loi", error);
      }
    };
    fetchListSubject();
  }, []);

  const handleRadioChange = (index) => {
    setSelectedCourseIndex(index);
  };

  const handleRadioChangeLHP = (index) => {
    console.log("index", index);
    setSelectedLHPIndex(index);
  };

  const getLHP = async (maHP) => {
    try {
      const response = await getApiLHP("/getListLopHocPhanByMaMonHoc/" + maHP);
      console.log(response.data.data);
      setListLHP(response.data.data);
    } catch (error) {
      console.log("loi lhp", error);
    }
  };

  const registerCourse = async (maLHP) => {
    try {
      const response = await postApiLHP("/addSinhVien", {
        maLopHocPhan: maLHP,
        maSV: maSV,
      });
      console.log(response);

      // After successful registration, fetch the updated list of registered courses
      getLHPBySv(); 
    } catch (error) {
      console.log("loi dang ky", error);
    }
  };

  const handleRegisterClick = () => {
    if (selectedLHPIndex !== null) {
      const selectedCourse = listLHP[selectedLHPIndex];
      registerCourse(selectedCourse.maLopHocPhan);
    } else {
      alert("Please select a course to register.");
    }
  };

  const getLHPBySv = async () => {
    try {
      const response = await getApiLHP("/getListLopHocPhanByMaSV/" + maSV);
      console.log("lhp theo sv", response.data.data);
      setListLHPBySv(response.data.data);
    } catch (error) {
      console.log("Loi get list", error);
    }
  };

  useEffect(() => {
    getLHPBySv();
  }, []);

  return (
    <div className="App">
      <h2>Đăng ký học phần</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th></th>
            <th>STT</th>
            <th>Mã HP</th>
            <th>Tên Môn Học</th>
            <th>TC</th>
            <th>Bắt buộc</th>
            <th>Học phần tiên quyết</th>
          </tr>
        </thead>
        <tbody>
          {listSubject.map((course, index) => (
            <tr key={index}>
              <td>
                <input
                  type="radio"
                  checked={selectedCourseIndex === index}
                  onChange={() => handleRadioChange(index)}
                  onClick={() => {
                    getLHP(course.maHP);
                  }}
                ></input>
              </td>
              <td>{subjectCounter + index}</td>
              <td>{course.maHP}</td>
              <td>{course.tenMonHoc}</td>
              <td>{course.TC}</td>
              <td>{course.obligatory ? "" : "X"}</td>
              <td>{course.Prerequisites}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Danh sách lớp học phần</h2>
      <div>
        <table className="course-table">
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>Mã LHP</th>
              <th>Tên lớp HP</th>
              <th>Lớp dự kiến</th>
              <th>Sĩ số tối đa</th>
              <th>Đã đăng ký</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {listLHP.map((course, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="radio"
                    checked={selectedLHPIndex === index}
                    onChange={() => handleRadioChangeLHP(index)}
                  ></input>
                </td>
                <td>{subjectCounter + index}</td>
                <td>{course.maLopHocPhan}</td>
                <td></td>
                <td>{course.tenLopHocPhan}</td>
                <td>{course.soLuongSV}</td>
                <td>{course.danhSachSinhVien.length}</td>
                <td>{course.tinhTrang}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>Chi Tiết lớp Học Phần</h2>
      <div>
        <table className="course-table">
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>Lịch Học</th>
              <th>Nhóm TH</th>
              <th>Phòng</th>
              <th>Cơ Sở</th>
              <th>Giảng Viên</th>
              <th>Thời Gian</th>
            </tr>
          </thead>
          <tbody>
            {selectedLHPIndex !== null && listLHP[selectedLHPIndex] && (
              <tr>
                <td>...</td>
                <td>{subjectCounter + selectedLHPIndex}</td>
                <td>{listLHP[selectedLHPIndex].tietHoc}</td>
                <td></td>
                <td>{listLHP[selectedLHPIndex].phongHoc}</td>
                <td>cơ sở 1</td>
                <td>{listLHP[selectedLHPIndex].giangVien}</td>
                <td>
                  {listLHP[selectedLHPIndex].ngayBatDau}-
                  {listLHP[selectedLHPIndex].ngayKetThuc}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <input
          onClick={handleRegisterClick}
          type="button"
          value="Đăng ký môn học"
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            backgroundColor: "#FF9900",
            color: "white",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        ></input>
      </div>
      <h2>Các lớp học phần đã đăng ký</h2>
      <div>
        <table className="course-table">
          <thead>
            <tr>
              <th></th>
              <th>STT</th>
              <th>Mã LHP</th>
              <th>Tên môn học</th>
              <th>Lớp dự kiến</th>
              <th>Số TC</th>
              <th>Nhóm TH</th>
              <th>Học Phí</th>
              <th>Thu</th>
              <th>Trạng thái LHP</th>
            </tr>
          </thead>
          <tbody>
            {listLHPBySv.map((course, index) => (
              <tr key={index}>
                <td></td>
                <td>{subjectCounter + index}</td>
                <td>{course.maLopHocPhan}</td>
                <td>{course.tenMonHoc}</td>
                <td>{course.tenLopHocPhan}</td>
                <td>{course.soTC}</td>
                <td></td>
                <td></td>
                <td>X</td>
                <td>{course.tinhTrang}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DangKiHocPhan;
