import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({});
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = form;
    const currentPassword = localStorage.getItem("role") === "librarian" ? "admin" : "user";

    const errors = {
      ...(oldPassword !== currentPassword && { oldPassword: "Mật khẩu hiện tại không đúng." }),
      ...(!oldPassword && { oldPassword: "Vui lòng nhập mật khẩu hiện tại." }),
      ...(!newPassword && { newPassword: "Vui lòng nhập mật khẩu mới." }),
      ...(newPassword && newPassword.length < 6 && { newPassword: "Mật khẩu mới phải từ 6 ký tự." }),
      ...(!confirmPassword && { confirmPassword: "Vui lòng xác nhận mật khẩu." }),
      ...(newPassword !== confirmPassword && { confirmPassword: "Mật khẩu xác nhận không khớp." }),
    };

    if (Object.keys(errors).length) return setError(errors);

    setSuccess("Đổi mật khẩu thành công!");
    setTimeout(() => navigate("/profile"), 1500);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="bg-white shadow rounded p-5" style={{ maxWidth: 500, width: "100%" }}>
        <h3 className="text-center text-danger mb-4">Đổi mật khẩu</h3>
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          {[
            { name: "oldPassword", placeholder: "Mật khẩu hiện tại" },
            { name: "newPassword", placeholder: "Mật khẩu mới" },
            { name: "confirmPassword", placeholder: "Xác nhận mật khẩu" },
          ].map(({ name, placeholder }) => (
            <div className="mb-3" key={name}>
              <input
                type="password"
                name={name}
                placeholder={placeholder}
                className={`form-control ${error[name] ? "is-invalid" : ""}`}
                value={form[name]}
                onChange={handleChange}
              />
              {error[name] && <div className="invalid-feedback">{error[name]}</div>}
            </div>
          ))}
          <button type="submit" className="btn btn-danger w-100">Xác nhận đổi mật khẩu</button>
        </form>
      </div>
    </div>
  );
}
