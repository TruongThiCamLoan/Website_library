import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import books from "../data/books";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';


export default function Header() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({ isLoggedIn: false, isLibrarian: false });
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const updateStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const isLibrarian = localStorage.getItem("role") === "librarian";
      setAuth({ isLoggedIn, isLibrarian });
    };
    updateStatus();
    window.addEventListener("storage", updateStatus);
    return () => window.removeEventListener("storage", updateStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    setAuth({ isLoggedIn: false, isLibrarian: false });
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
      setSuggestions([]);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);

    if (!value.trim()) return setSuggestions([]);

    const kw = value.toLowerCase();
    const filtered = books.filter((book) => {
      const title = book.title?.toLowerCase() || "";
      const year = String(book.year || "");
      const authors = book.authors?.map((a) => a.name.toLowerCase()).join(", ") || "";
      const category = book.category?.name?.toLowerCase() || "";

      return (
        title.startsWith(kw) ||
        authors.startsWith(kw) ||
        category.startsWith(kw) ||
        year.startsWith(kw)
      );
    });

    setSuggestions(filtered.slice(0, 6));
  };

  return (
    <nav className="navbar navbar-light bg-white shadow-sm p-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo + Trang chủ */}
        <div className="d-flex align-items-center">
          <img
            src="https://media.istockphoto.com/id/1202911884/vi/vec-to/logo-s%C3%A1ch-v%C4%83n-h%E1%BB%8Dc-gi%C3%A1o-d%E1%BB%A5c-th%C6%B0-vi%E1%BB%87n-ki%E1%BA%BFn-th%E1%BB%A9c-%C4%91%E1%BB%8Dc-trang-nghi%C3%AAn-c%E1%BB%A9u-gi%E1%BA%A5y-vector-h%E1%BB%8Dc-tr%C6%B0%E1%BB%9Dng.jpg?s=170667a&w=0&k=20&c=kfffsGCfUSLINQSvjA3PNfxflPmimOYnTP-s1Orkmpc="
            alt="Thư Viện Logo"
            className="me-2"
            style={{ width: 60, height: 60 }}
          />
          <Link to="/" className="navbar-brand mb-0 h4 text-dark text-decoration-none">
            Thư Viện
          </Link>
        </div>

        {/* Tìm kiếm + Chuông + Tài khoản */}
        <div className="d-flex align-items-center position-relative">
          {/* Form tìm kiếm */}
          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm sách..."
              style={{ width: "250px" }}
              value={keyword}
              onChange={handleChange}
            />
            <button className="btn btn-outline-primary ms-2" type="submit">🔍</button>

            {/* Gợi ý tìm kiếm */}
            {suggestions.length > 0 && (
              <div
                className="position-absolute bg-white shadow rounded mt-5 p-2"
                style={{ top: "100%", left: 0, zIndex: 1000, width: "100%" }}
              >
                {suggestions.map((book) => (
                  <div
                    key={book.id}
                    className="p-2 border-bottom text-dark"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/book/${book.id}`);
                      setKeyword("");
                      setSuggestions([]);
                    }}
                  >
                    <strong>{book.title}</strong> –{" "}
                    {book.authors?.map((a) => a.name).join(", ") || "Không rõ"}
                  </div>
                ))}
              </div>
            )}
          </form>

          {/* Chuông thông báo */}
          <div className="me-3 position-relative">
            <button
              className="btn btn-outline-secondary position-relative"
              title="Thông báo"
              onClick={() => alert("Bạn có 2 sách sắp hết hạn!")}
            >
              <i className="bi bi-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                2
              </span>
            </button>
          </div>

          {/* Dropdown tài khoản */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Quản lý tài khoản
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {!auth.isLoggedIn ? (
                <>
                  <li><Link className="dropdown-item" to="/login">Đăng nhập</Link></li>
                  <li><Link className="dropdown-item" to="/register">Đăng ký</Link></li>
                </>
              ) : (
                <>
                  <li><Link className="dropdown-item" to="/history">Lịch sử mượn sách</Link></li>
                  <li><Link className="dropdown-item" to="/profile">Thông tin cá nhân</Link></li>
                  <li><Link className="dropdown-item" to="/change-password">Đổi mật khẩu</Link></li>
                  {auth.isLibrarian && (
                    <li><Link className="dropdown-item" to="/library-management">Quản lý thư viện</Link></li>
                  )}
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
