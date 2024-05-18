import React from "react";
import "./ThoiKhoaBieu.css";

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
  const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
  
  // Ngày bắt đầu tuần
  const startDate = new Date(2024, 4, 20); // Ví dụ: ngày 20 tháng 5 năm 2024
  const dates = getWeekDates(startDate);

  return (
    <div className="body">
      <table style={{width:"100%", height:"auto", display:"flex", flexDirection:"column"}}>
        <thead>
          <tr className="trTHTKB" style={{width:"100%"}}>
            <th>Buổi học</th>
            {daysOfWeek.map((day, index) => (
              <th key={day}>
                {day}
                <br />
                {dates[index]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="trTHTKB">
            <td>Buổi sáng</td>
            {daysOfWeek.map(day => <td key={`morning-${day}`}></td>)}
          </tr>
          <tr className="trTHTKB">
            <td>Buổi trưa</td>
            {daysOfWeek.map(day => <td key={`afternoon-${day}`}></td>)}
          </tr>
          <tr className="trTHTKB">
            <td>Buổi tối</td>
            {daysOfWeek.map(day => <td key={`evening-${day}`}></td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ThoiKhoaBieu;
