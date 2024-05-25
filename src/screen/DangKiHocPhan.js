import React, { useEffect, useState, useCallback } from "react";
import "../App.css";
import { getApiLHP, getApiNoneToken, postApiLHP } from "../api/Api";

function DangKiHocPhan() {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [selectedLHPIndex, setSelectedLHPIndex] = useState(null);
  const [listSubject, setListSubject] = useState([]);
  const [listLHP, setListLHP] = useState([]);
  const [listLHPBySv, setListLHPBySv] = useState([]);
  
  const [selectedYear, setSelectedYear] = useState("");
  const years = ["2021-2022", "2022-2023", "2023-2024", "2024-2025"]; // Thêm các năm học cần thiết
  const [listHK, setListHK] = useState("");
  const hk = ["HK1", "HK2"]; // Thêm các học kỳ cần thiết
  const [maSV, setMaSV] = useState("");

  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  useEffect(() => {
    const maSVFromUrl = getQueryParam("maSV");
    if (maSVFromUrl) {
      setMaSV(maSVFromUrl);
    }
  }, []);

  const subjectCounter = 1;

  useEffect(() => {
    const fetchListSubject = async () => {
      try {
        const res = await getApiNoneToken(
          "http://localhost:3001/api/monhoc/getListSubject"
        );

        if (selectedYear && selectedYear !== "Chọn năm học") {
          const filteredSubjects = res.data.data.filter(subject => subject.namHoc === selectedYear);
          setListSubject(filteredSubjects);
        } else {
          setListSubject(res.data.data);
        }
      } catch (error) {
        console.log("loi", error);
      }
    };
    fetchListSubject();
  }, [selectedYear]);

  const handleRadioChange = (index) => {
    setSelectedCourseIndex(index);
  };

  const handleRadioChangeLHP = (index) => {
    setSelectedLHPIndex(index);
  };

  const getLHP = async (maHP) => {
    try {
      const response = await getApiLHP("/getListLopHocPhanByMaMonHoc/" + maHP);

      if (listHK && listHK !== "Chọn HK") {
      const filteredSubjects = response.data.data.filter(subject => subject.namHoc === selectedYear && subject.hocKy === listHK);
      setListLHP(filteredSubjects);
      } else {
        alert("Vui lòng chọn HK");
      }
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

      getLHPBySv(); 
    } catch (error) {
      console.log("loi dang ky", error);
    }
  };

  const handleRegisterClick = () => {
    if (selectedLHPIndex !== null) {
      const selectedCourse = listLHP[selectedLHPIndex];
        // Check if the course is full
    if (selectedCourse.danhSachSinhVien.length >= selectedCourse.soLuongSV) {
      alert("Lớp học phần này đã đầy. Không thể đăng ký thêm.");
      return;
    }
      // Tính tổng số tín chỉ đã đăng ký trong năm học được chọn
      const totalTC = listLHPBySv
        .filter((course) => course.namHoc === selectedYear)
        .reduce((total, course) => total + course.soTC, 0);

      // // nếu đã đăng ký rồi thì k cho đăng ký
      // const isRegistered = listLHPBySv.some(
      //   (course) => course.maLopHocPhan === selectedCourse.maLopHocPhan
      // );
      // if (isRegistered) {
      //   alert("Bạn đã đăng ký lớp học phần này rồi.");
      //   return;
      // }
      //    // nếu đăng ký môn học đó rồi, thì mấy lớp trùng mã môn học đó thì k đăng ký nữa
      
      //  const isRegisteredSameSubject = listLHPBySv.some(
      //     (course) => course.maHP === selectedCourse.maHP
      //   );
      //   if (isRegisteredSameSubject) {
      //     alert("Bạn đã đăng ký môn học này rồi.");
      //     return;
      //   }



      // Kiểm tra nếu tổng số tín chỉ sau khi thêm môn học mới vượt quá 30
      console.log("Số tín chỉ đã vượt quá giới hạn 30 tín chỉ.", totalTC + selectedCourse.soTC);
      if (totalTC + selectedCourse.soTC > 30) {
        alert("Số tín chỉ đã vượt quá giới hạn 30 tín chỉ.");
        console.log("Số tín chỉ đã vượt quá giới hạn 30 tín chỉ.", totalTC + selectedCourse.soTC);
        return;
      }

      const userConfirmed = window.confirm(`Are you sure you want to register for the course: ${selectedCourse.maLopHocPhan}?`);

      if (userConfirmed) {
        registerCourse(selectedCourse.maLopHocPhan);
      }
    } else {
      alert("Please select a course to register.");
    }
  };

  const getLHPBySv = useCallback(async () => {
    try {
      const response = await getApiLHP("/getListLopHocPhanByMaSV/" + maSV);
      if (listHK && listHK !== "Chọn HK") {
        const filteredSubjects = response.data.data.filter(subject => subject.hocKy === listHK);
        setListLHPBySv(filteredSubjects);
      }
      // setListLHPBySv(response.data.data);
    } catch (error) {
      console.log("Loi get list", error);
    }
  }, [maSV,listHK]);

  useEffect(() => {
    if (maSV) {
      getLHPBySv();
    }
  }, [maSV, getLHPBySv]);
  ///
  // Function to filter out already registered courses
const getAvailableCourses = () => {
  return listSubject.filter(
    (subject) => !listLHPBySv.some((registeredCourse) => registeredCourse.maMonHoc === subject.maHP)
  );
};

  // hủy đăng ký học phần 
  const HuyDangKy = async (maLHP) => {
    try {
      const userConfirmed = window.confirm("bạn có chắc muốn hủy đăng ký?" );
      console.log("maLHP", maLHP);
      if (userConfirmed) {
        const response = await postApiLHP("/deleteSinhVien", {
          maLopHocPhan: maLHP,
          maSV: maSV,
        });
        
        console.log(response);
      }
  

      getLHPBySv(); 
    } catch (error) {
      console.log("loi dang ky", error);
    }
  };

  return (
    <div className="App">
      {/* Combobox */}
      <div>
        <label htmlFor="year-select">Chọn năm học: </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Chọn năm học</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>


      <div style={{marginTop:10, marginLeft:2}}>
        <label htmlFor="year-select">Chọn HK: </label>
        <select
          id="HK-select"
          value={listHK}
          onChange={(e) => setListHK(e.target.value)}
        >
          <option value="">Chọn HK</option>
          {hk.map((hk, index) => (
            <option key={index} value={hk}>
              {hk}
            </option>
          ))}
        </select>
      </div>

      <h2>Đăng ký học phần</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th className="radio-column"></th>
            <th className="stt-column">STT</th>
            <th>Mã HP</th>
            <th>Tên Môn Học</th>
            <th>TC</th>
            <th>Bắt buộc</th>
            <th>Học phần tiên quyết</th>
          </tr>
        </thead>
        <tbody>
        {getAvailableCourses().map((course, index) => (
            <tr key={index}>
              <td className="radio-column">
                <input
                  type="radio"
                  checked={selectedCourseIndex === index}
                  onChange={() => handleRadioChange(index)}
                  onClick={() => {
                    getLHP(course.maHP);
                  }}
                ></input>
              </td>
              <td className="stt-column">{subjectCounter + index}</td>
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
              <th className="radio-column"></th>
              <th className="stt-column">STT</th>
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
                <td className="radio-column">
                  <input
                    type="radio"
                    checked={selectedLHPIndex === index}
                    onChange={() => handleRadioChangeLHP(index)}
                  ></input>
                </td>
                <td className="stt-column">{subjectCounter + index}</td>
                <td>{course.maLopHocPhan}</td>
                <td>{course.tenMonHoc}</td>
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
                <td>{listLHP[selectedLHPIndex].tietHoc} {listLHP[selectedLHPIndex].dayOfWeek}</td>
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
            height: "50px",
            backgroundColor: "#FF9900",
            color: "white",
            borderRadius: "5px",
            marginTop: "10px",
            width: "260px",
            marginBottom: "10px",
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
            {listLHPBySv
              .filter(course => course.namHoc === selectedYear)
              .map((course, index) => (
                <tr key={index}>
                   <input type="button"  onClick={()=>HuyDangKy(course.maLopHocPhan)} value={"Hủy"}></input> 
                  <td>{subjectCounter + index}</td>
                  <td>{course.maLopHocPhan}</td>
                  <td>{course.tenMonHoc}</td>
                  <td>{course.tenLopHocPhan}</td>
                  <td>{course.soTC}</td>
                  <td></td>
                  <td>  {course.soTC * 610000} {/* Calculate tuition fee */}</td>
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
