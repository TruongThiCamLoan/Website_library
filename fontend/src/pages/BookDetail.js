import { useParams, Link } from "react-router-dom";
import books from "../data/books";

export default function BookDetail() {
  const { id } = useParams();
  const book = books.find(b => b.id.toString() === id);

  if (!book) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">📕 Không tìm thấy sách</h2>
        <Link to="/" className="btn btn-outline-primary mt-3">← Về trang chủ</Link>
      </div>
    );
  }

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  // ✅ Tính số lượng còn dựa trên status "available"
  const availableCopies = book.book_copies?.filter(copy => copy.status === "available") || [];
  const availableCount = availableCopies.length;
  const isAvailable = availableCount > 0;

  const authors = book.authors?.map(a => a.name).join(", ") || "Không rõ";
  const category = book.category?.name || "Chưa phân loại";

  const relatedBooks = books.filter(
  b => b.id !== book.id && b.category?.name === book.category?.name
).slice(0, 4);


  const handleAction = (type) => {
    if (!isLoggedIn) {
      alert(`❗ Bạn phải đăng nhập để ${type === "borrow" ? "mượn" : "đặt trước"} sách.`);
      return;
    }

    const current = localStorage.getItem("currentBorrowedBook");
    if (current && current !== book.id.toString()) {
      alert("❗ Bạn chỉ được mượn hoặc đặt trước 1 cuốn sách tại một thời điểm.");
      return;
    }

    localStorage.setItem("currentBorrowedBook", book.id.toString());
    alert(type === "borrow"
      ? "✅ Đã gửi yêu cầu mượn sách!"
      : "📬 Đã gửi yêu cầu đặt sách!");
  };

  return (
    <div className="container py-5">
      {/* Hình ảnh và thông tin chính */}
      <div className="row align-items-center">
        <div className="col-md-4 mb-4">
          <img src={book.image} alt={book.title} className="img-fluid rounded shadow" />
        </div>

        <div className="col-md-8">
          <h2 className="fw-bold text-primary mb-3">{book.title}</h2>
          <ul className="list-unstyled text-muted fs-6">
            <li><strong>Mã sách:</strong> {book.id}</li>
            <li><strong>Tác giả:</strong> <span className="text-success">{authors}</span></li>
            <li><strong>Thể loại:</strong> {category}</li>
            <li><strong>NXB:</strong> {book.publisher || "?"}</li>
            <li><strong>Năm:</strong> {book.year || "?"}</li>
            <li><strong>Lượt xem:</strong> {book.views || 0}</li>
            <li><strong>Số lượng còn:</strong> {availableCount}</li>
          </ul>

          {/* Nút mượn hoặc đặt trước */}
          <div className="mt-4">
            {isAvailable ? (
              <>
                <div className="alert alert-success mb-3">
                  ✅ Sách hiện có sẵn. Mời bạn đến thư viện để mượn.
                </div>
                <button className="btn btn-primary" onClick={() => handleAction("borrow")}>
                  Mượn Sách Ngay
                </button>
              </>
            ) : (
              <>
                <div className="alert alert-warning mb-3">
                  ⚠️ Sách đã hết. Bạn có thể đặt trước.
                </div>
                <button className="btn btn-outline-danger" onClick={() => handleAction("reserve")}>
                  Đặt Trước
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Phần giới thiệu */}
      <div className="mt-5 pt-4 border-top">
        <h5 className="text-muted mb-3">Giới Thiệu Sách</h5>
        <h6 className="text-danger">{book.title?.toUpperCase()}</h6>
        <p style={{ textAlign: "justify" }}>
          {book.description || `Cuốn sách "${book.title}" mang đến nhiều cảm xúc và giá trị sống. Hãy đón đọc để khám phá những điều tuyệt vời từ tác phẩm này.`}
        </p>
      </div>
      {/* Sách liên quan */}
            {relatedBooks.length > 0 && (
              <div className="mt-5 pt-4 border-top">
                <h5 className="text-muted mb-4">📚 Sách Cùng Thể Loại</h5>
                <div className="row">
                  {relatedBooks.map(rb => (
                    <div key={rb.id} className="col-md-3 mb-4">
                      <Link to={`/book/${rb.id}`} className="text-decoration-none text-dark">
                        <div className="card h-100 shadow-sm border-0 rounded-4">
                          <div className="position-relative" style={{ height: "250px", overflow: "hidden" }}>
                            <img
                              src={rb.image}
                              alt={rb.title}
                              className="w-100 h-100 object-fit-cover"
                            />
                          </div>
                          <div className="card-body bg-light-subtle">
                            <h6 className="fw-semibold text-primary-emphasis">{rb.title}</h6>
                            <p className="small text-muted mb-0">{rb.authors?.map(a => a.name).join(", ")}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

      {/* Nút quay lại */}
      <div className="mt-4">
        <Link to="/" className="btn btn-outline-dark">← Quay lại danh sách</Link>
      </div>
    </div>

    
  );
}
