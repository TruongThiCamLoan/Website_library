import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Tác giả, thể loại
  const authors = book.authors?.map(author => author.name).join(", ") || "Không rõ";
  const category = book.category?.name || "Chưa phân loại";

  // ✅ Tính số lượng sách còn lại (status === "available")
  const availableCount = Array.isArray(book.book_copies)
    ? book.book_copies.filter(copy => copy.status === "available").length
    : 0;

  const isAvailable = availableCount > 0;

  const handleBorrow = (e) => {
    e.preventDefault();
    alert(isLoggedIn ? "✅ Yêu cầu mượn sách đã được gửi đến thủ thư!" : "❗ Bạn phải đăng nhập để mượn sách.");
  };

  return (
    <Link to={`/book/${book.id}`} className="text-decoration-none text-dark">
      <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden book-card">
        {/* Hình ảnh sách */}
        <div className="position-relative" style={{ height: "220px", overflow: "hidden" }}>
          <img
            src={book.image}
            alt={book.title}
            className="w-100 h-100 object-fit-cover"
          />
        </div>

        {/* Nội dung */}
        <div className="card-body d-flex flex-column bg-light-subtle">
          <h5 className="card-title fw-semibold text-primary-emphasis">{book.title}</h5>
          <ul className="list-unstyled small text-secondary mb-3">
            <li><strong>Mã sách:</strong> {book.id}</li>
            <li><strong>Tác giả:</strong> {authors}</li>
            <li><strong>Thể loại:</strong> {category}</li>
            <li><strong>NXB:</strong> {book.publisher || "Không rõ"}</li>
            <li><strong>Năm:</strong> {book.year || "?"}</li>
            <li><strong>Số lượng còn:</strong> {availableCount > 0 ? availableCount : "Hết sách"}</li>
          </ul>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <button className="btn btn-sm btn-outline-success rounded-pill px-3">Xem thêm</button>
            <button
              className={`btn btn-sm rounded-pill px-3 ${isAvailable ? "btn-success" : "btn-outline-secondary"}`}
              onClick={isAvailable ? handleBorrow : undefined}
              disabled={!isAvailable}
            >
              {isAvailable ? "Mượn Sách" : "Hết Sách"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
