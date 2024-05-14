import React, { useEffect, useState } from 'react';
import '../App.css';
// import { postApiNoneToken } from './api/Api';
import { getApiLHP, getApiNoneToken } from '../api/Api';

function DangKiHocPhan() {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [selectedLHPIndex, setSelectedLHPIndex] = useState(null);
  const [listSubject, setListSubject] = useState([]);
  const [listLHP, setListLHP] = useState([]);
  // STT
  const subjectCounter=1;


  // show list danh sach mon hoc co the dang ky
 useEffect(() => {
  const listSubject = async()=>{
 try {
  console.log('listSubject');
  const res = await getApiNoneToken('http://localhost:3001/api/monhoc/getListSubject');
  console.log(res.data.data);
  setListSubject(res.data.data);
}catch (error) {
  console.log("loi",error);
 }}
listSubject();
 }, []);


  const handleRadioChange = (index) => {
    setSelectedCourseIndex(index);
  };
  const handleRadioChangeLHP = (index) => {
    setSelectedLHPIndex(index);
  }
// get lhp theo mã  mon hoc
const getListLHP = async (maHP) => {
  try {
    const response = await getApiLHP("/getListLopHocPhanByMaMonHoc/"+maHP)
    console.log(response.data.data);
    setListLHP(response.data.data);
  } catch (error) {
    console.log("loi lhp", error);
  }
}

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
            <th>học phần tiên quyết</th>
          </tr>
        </thead>
        <tbody>
          {listSubject.map((course, index) => (
            
            <tr key={index}>
            <td> <input type="radio" checked={selectedCourseIndex === index} onChange={() => handleRadioChange(index)}
              onClick={() => {getListLHP(course.maHP);}}
            ></input> </td>
             
              <td>{subjectCounter+index}</td>
              <td>{course.maHP}</td>
              <td>{course.tenMonHoc}</td>
              <td>{course.TC}</td>
              <td>{course.obligatory?"":"X"}</td>
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
            <th>
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody>
          {listLHP.map((course, index) => (
            
            <tr key={index}>
            <td> <input type="radio" checked={selectedLHPIndex === index} onChange={() => handleRadioChangeLHP(index)}
              // onClick={() => {getListLHP(course.maHP);}}
            ></input> </td>
              <td>{subjectCounter+index}</td>
              <td>{course.maLopHocPhan}</td>
              <td>{course.maLopHocPhan}</td>
              <td>{course.tenLopHocPhan}</td>
              <td>{course.soLuongSV}</td>
              <td>{course.soLuongDaDangKy}</td>
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
