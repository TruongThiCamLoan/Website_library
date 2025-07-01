import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Tài khoản giả lập
  const accounts = {
    admin1: { email: "admin@student.edu.vn", password: "admin1", role: "librarian" },
    user123: { email: "user@student.edu.vn", password: "user123", role: "student" },
    nghia123: { email: "nghia@student.edu.vn", password: "123456", role: "student" },
  };

  const validate = () => {
    const errs = {};
    if (!user.username) errs.username = "Vui lòng nhập tên đăng nhập";
    else if (user.username.length < 6) errs.username = "Tên đăng nhập phải từ 6 ký tự";

    if (!user.email) errs.email = "Vui lòng nhập email";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu\.vn$/.test(user.email))
      errs.email = "Email phải có đuôi edu.vn";

    if (!user.password) errs.password = "Vui lòng nhập mật khẩu";
    else if (user.password.length < 6) errs.password = "Mật khẩu phải từ 6 ký tự";

    return errs;
  };

  const login = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    const match = accounts[user.username];
    if (match && match.email === user.email && match.password === user.password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", match.role);
      localStorage.setItem("username", user.username);
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } else {
      setErrors({ general: "Thông tin đăng nhập không đúng." });
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow rounded overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
        <div className="col-md-6 bg-white p-5">
          <h3 className="text-center mb-4 text-danger">Đăng nhập</h3>

          <div className="d-flex justify-content-center gap-3 mb-3">
            {["Đ", "N", "T", "K"].map((c, i) => (
              <button key={i} className="btn btn-outline-danger rounded-circle">{c}</button>
            ))}
          </div>

          <p className="text-center text-muted">Điền đầy đủ thông tin bên dưới</p>
          {errors.general && <div className="alert alert-danger">{errors.general}</div>}

          <form onSubmit={login}>
            {["username", "email", "password"].map((field, i) => (
              <div className="mb-3" key={i}>
                <input
                  type={field === "password" ? "password" : "text"}
                  className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                  placeholder={
                    field === "username" ? "Tên đăng nhập"
                    : field === "email" ? "Email"
                    : "Mật khẩu"
                  }
                  value={user[field]}
                  onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                />
                {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
              </div>
            ))}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="agree"/>
                <label className="form-check-label" htmlFor="agree">Ghi nhớ tài khoản</label>
              </div>
              <Link to="/forgot-password" className="text-decoration-none text-danger">
                Quên mật khẩu?
              </Link>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-danger w-50">Đăng nhập</button>
              <Link to="/register" className="btn btn-outline-danger w-50">Đăng ký</Link>
            </div>
          </form>
        </div>

        <div className="col-md-6 p-0 d-none d-md-block">
          <img
            src="https://www.netabooks.vn/Data/Sites/1/Product/68167/mot-cuon-sach-chua-lanh-4.jpg"
            alt="Login"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}