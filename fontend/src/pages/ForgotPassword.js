import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[\w-.]+@[\w-]+\.(edu\.vn)$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Vui lòng nhập email.");
    } else if (!validateEmail(email)) {
      setError("Email không hợp lệ (.edu.vn)");
    } else {
      // Giả lập gửi email
      setMessage("Đã gửi liên kết khôi phục mật khẩu tới email của bạn.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="bg-white shadow rounded p-5" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center text-danger mb-4">Quên mật khẩu</h3>
        <p className="text-center text-muted mb-4">Nhập email để lấy lại mật khẩu</p>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Nhập email .edu.vn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">Gửi yêu cầu</button>

          <p className="text-center mt-3">
            Trở lại <Link to="/login" className="text-decoration-none">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
