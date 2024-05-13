import React, { useEffect, useState } from 'react';
import './App.css';
// import { postApiNoneToken } from './api/Api';
import { getApiLHP, getApiNoneToken } from './api/Api';

function App() {
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
    console.log("index",index);
    setSelectedLHPIndex(index);
  }
// get lhp theo mã  mon hoc
const getLHP = async (maHP) => {
  try {
    const response = await getApiLHP("/getListLopHocPhanByMaMonHoc/"+maHP)
    console.log(response.data.data);
    setListLHP(response.data.data);
  } catch (error) {
    console.log("loi lhp", error);
  }
}
// get chi tiet lhp
// const getDetailLHP =(lhp) => {
//   console.log("lhoo",lhp);
//   setListDetailLHP(lhp);
//   console.log("listDetailLHP",listDetailLHP);
 

// }

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
              onClick={() => {getLHP(course.maHP);}}
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
              // onClick={() => {getDetailLHP(course)}}
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
            <th>
              Thời Gian
            </th>
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
          <td>{listLHP[selectedLHPIndex].ngayBatDau}-{listLHP[selectedLHPIndex].ngayKetThuc}</td>
        </tr>
        
       
      )}
   
        </tbody>
      </table>
      <input type="button" value="Đăng ký môn học" style={{justifyContent:"center",
      alignItems:"center",height:"30px",backgroundColor:"#FF9900",color:"white",borderRadius:"5px",marginTop:"10px"
      }}  >
        
      </input>
      
      </div>


    </div>
  );
}


export default App;
