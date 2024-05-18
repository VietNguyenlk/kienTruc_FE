import React, { useCallback, useEffect, useState } from "react";
import "./ThoiKhoaBieu.css";
import { getApiLHP } from "../../api/Api";

// Hàm để định dạng ngày theo định dạng dd/MM/yyyy
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// Hàm để lấy danh sách các ngày trong tuần bắt đầu từ một ngày cụ thể
function getWeekDates(startDate) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    dates.push(formatDate(currentDate));
  }
  return dates;
}

function ThoiKhoaBieu() {
    const [selectedYear, setSelectedYear] = useState("");
    const years = ["2021-2022", "2022-2023", "2023-2024", "2024-2025"];
    const [maSV, setMaSV] = useState("");
    const [listLHPBySv, setListLHPBySv] = useState([]);
    
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

    const getLHPBySv = useCallback(async () => {
        try {
            const response = await getApiLHP("/getListLopHocPhanByMaSV/" + maSV);
            setListLHPBySv(response.data.data);
        } catch (error) {
            console.log("Lỗi get list", error);
        }
    }, [maSV]);
    
    useEffect(() => {
        if (maSV) {
            getLHPBySv();
        }
    }, [maSV, getLHPBySv]);

    const timetable = {
        "Thứ Hai": [],
        "Thứ Ba": [],
        "Thứ Tư": [],
        "Thứ Năm": [],
        "Thứ Sáu": [],
        "Thứ Bảy": [],
        "Chủ Nhật": []
    };

    listLHPBySv.forEach((lhp) => {
        
        const { dayOfWeek, tietHoc, tenMonHoc,giangVien,phongHoc,namHoc ,hocKy} = lhp;
        if (timetable[dayOfWeek]) {
            timetable[dayOfWeek].push({ tietHoc, tenMonHoc, giangVien, phongHoc,namHoc,hocKy});
        }
    });

    return (
        <div className="container" style={{ flexDirection: "column", marginTop: "120px" }}>
            <div>
                <label htmlFor="year-select">Chọn năm học: </label>
                <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Hiện tại</option>
                    {years.map((year, index) => (
                        <option key={index} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Thứ Hai</th>
                        <th>Thứ Ba</th>
                        <th>Thứ Tư</th>
                        <th>Thứ Năm</th>
                        <th>Thứ Sáu</th>
                        <th>Thứ Bảy</th>
                        <th>Chủ Nhật</th>
                    </tr>
                </thead>
                <tbody>
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <tr key={i}>
                            {Object.keys(timetable).map((day, j) => (
                                <td key={j}>
                                    {timetable[day][i] && timetable[day][i].namHoc === "2024-2025"  ? (
                                        <div>
                                          {timetable[day][i].tenMonHoc} <br />
                                            Tiết:<strong>{timetable[day][i].tietHoc}</strong><br />
                                           
                                           Phòng Học: {timetable[day][i].phongHoc} <br />
                                              Giảng Viên: {timetable[day][i].giangVien} <br />
                                                Năm Học: {timetable[day][i].namHoc} <br />
                                        </div>
                                    ) : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

//   const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  
//   // Ngày bắt đầu tuần
//   const startDate = new Date(2024, 4, 20); // Ví dụ: ngày 20 tháng 5 năm 2024
//   const dates = getWeekDates(startDate);

//   return (
//     <div className="body">
//       <table style={{width:"100%", height:"auto", display:"flex", flexDirection:"column"}}>
//         <thead>
//           <tr className="trTHTKB" style={{width:"100%"}}>
//             <th>Buổi học</th>
//             {daysOfWeek.map((day, index) => (
//               <th key={day}>
//                 {day}
//                 <br />
//                 {dates[index]}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="trTHTKB">
//             <td>Buổi sáng</td>
//             {daysOfWeek.map(day => <td key={`morning-${day}`}></td>)}
//           </tr>
//           <tr className="trTHTKB">
//             <td>Buổi trưa</td>
//             {daysOfWeek.map(day => <td key={`afternoon-${day}`}></td>)}
//           </tr>
//           <tr className="trTHTKB">
//             <td>Buổi tối</td>
//             {daysOfWeek.map(day => <td key={`evening-${day}`}></td>)}
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );

}

export default ThoiKhoaBieu;
