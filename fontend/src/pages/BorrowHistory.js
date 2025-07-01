import React, { useEffect, useState } from "react";

export default function BorrowHistory() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTime, setFilterTime] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để xem lịch sử mượn trả.");
      window.location.href = "/login";
      return;
    }

    const mockData = [
      { id: 1, title: "Dế mèn phiêu lưu ký", start_time: "2025-06-01", due_time: "2025-06-15", end_time: "2025-06-14" },
      { id: 2, title: "Lập trình C cơ bản", start_time: "2025-06-20", due_time: "2025-07-04", end_time: null },
      { id: 3, title: "Tư duy nhanh và chậm", start_time: "2025-04-10", due_time: "2025-04-24", end_time: "2025-04-23" },
      { id: 4, title: "Đắc nhân tâm", start_time: "2025-05-02", due_time: "2025-05-16", end_time: "2025-05-16" },
      { id: 5, title: "Lập trình Java nâng cao", start_time: "2025-07-01", due_time: "2025-07-15", end_time: null },
      { id: 6, title: "Tôi thấy hoa vàng trên cỏ xanh", start_time: "2025-03-12", due_time: "2025-03-26", end_time: "2025-03-25" },
      { id: 7, title: "Nhà giả kim", start_time: "2025-01-08", due_time: "2025-01-22", end_time: "2025-01-20" },
      { id: 8, title: "Sống như người Nhật", start_time: "2025-06-15", due_time: "2025-06-29", end_time: null },
      { id: 9, title: "Clean Code", start_time: "2025-07-01", due_time: "2025-07-14", end_time: null },
      { id: 10, title: "Giết con chim nhại", start_time: "2025-02-18", due_time: "2025-03-03", end_time: "2025-03-01" },
      { id: 11, title: "Những người khốn khổ", start_time: "2025-06-10", due_time: "2025-06-24", end_time: "2025-06-23" },
    ];

    setRecords(mockData);
    setFilteredRecords(mockData);
  }, []);

  useEffect(() => {
    let filtered = [...records];

    if (filterStatus !== "all") {
      filtered = filtered.filter((r) =>
        filterStatus === "returned" ? r.end_time : !r.end_time
      );
    }

    if (filterTime !== "all" && !filterDate) {
      const now = new Date();
      filtered = filtered.filter((r) => {
        const start = new Date(r.start_time);
        if (filterTime === "month") {
          return (
            start.getMonth() === now.getMonth() &&
            start.getFullYear() === now.getFullYear()
          );
        } else if (filterTime === "year") {
          return start.getFullYear() === now.getFullYear();
        }
        return true;
      });
    }

    if (filterDate) {
      filtered = filtered.filter((r) => r.start_time === filterDate);
    }

    setFilteredRecords(filtered);
  }, [filterStatus, filterTime, filterDate, records]);

  const getStatus = (record) => (record.end_time ? "Đã trả" : "Đang mượn");

  // Danh sách sách bị đặt trước (giả lập)
  const reservedBooks = [2, 8]; // ID sách bị đặt trước

  const handleRenew = (bookId) => {
    const renewKey = `renewCount_${bookId}`;
    const currentCount = parseInt(localStorage.getItem(renewKey) || "0");

    if (currentCount >= 2) {
      alert("❗ Bạn đã sử dụng hết số lần gia hạn.");
      return;
    }

    if (reservedBooks.includes(bookId)) {
      alert("❗ Sách đã được đặt trước, không thể gia hạn.");
      return;
    }

    // Giả lập tạo phiếu gửi thủ thư
    const approval = true; // giả định luôn đồng ý

    if (approval) {
      localStorage.setItem(renewKey, currentCount + 1);
      alert("✅ Gia hạn mượn sách thành công. Phiếu đã gửi thủ thư phê duyệt.");
    } else {
      alert("❌ Phiếu mượn của bạn đã bị từ chối, vui lòng liên hệ Thủ thư.");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 fw-bold">Lịch sử mượn trả sách</h3>

      {/* Bộ lọc */}
      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="returned">Đã trả</option>
            <option value="borrowing">Đang mượn</option>
          </select>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <button
            className="btn btn-secondary w-100"
            onClick={() => {
              setFilterDate("");
              setFilterStatus("all");
              setFilterTime("all");
            }}
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>

      {/* Bảng kết quả */}
      {filteredRecords.length === 0 ? (
        <div className="alert alert-info">
          {records.length === 0
            ? "Bạn chưa mượn sách nào."
            : "Không có kết quả phù hợp với bộ lọc."}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>STT</th>
                <th>Tên sách</th>
                <th>Ngày mượn</th>
                <th>Hạn trả</th>
                <th>Ngày trả</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.title}</td>
                  <td>{record.start_time}</td>
                  <td>{record.due_time}</td>
                  <td>{record.end_time || "Chưa trả"}</td>
                  <td>
                    <span
                      className={`badge ${record.end_time ? "bg-success" : "bg-warning text-dark"}`}
                    >
                      {getStatus(record)}
                    </span>
                  </td>
                  <td>
                    {!record.end_time && (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleRenew(record.id)}
                      >
                        Gia hạn
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
