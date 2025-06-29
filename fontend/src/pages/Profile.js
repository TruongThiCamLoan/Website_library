import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    school_name: "",
    address: "",
    password: "",
    newPassword: "",
  });
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    if (!isLoggedIn || !username) {
      alert("Vui lòng đăng nhập để xem hoặc chỉnh sửa thông tin cá nhân");
      navigate("/login");
      return;
    }

    // Giả lập dữ liệu lấy từ backend (theo sơ đồ UML)
    const mockData = {
      admin1: {
        id: 1,
        name: "Nguyễn Văn A",
        email: "admin@edu.vn",
        phone: "0987654321",
        school_name: "Đại học CNTT",
        address: "TP.HCM",
        password: "admin1",
      },
    };

    const account = mockData[username];
    if (account) {
      setUser({ ...account, newPassword: "" });
      setAvatar(localStorage.getItem("avatar") || "");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        localStorage.setItem("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!user.name) errs.name = "Vui lòng nhập tên";
    if (!user.email) errs.email = "Vui lòng nhập email";
    else if (!/^[\w.-]+@[\w.-]+\.edu\.vn$/.test(user.email))
      errs.email = "Email phải đúng định dạng .edu.vn";
    if (user.newPassword && user.newPassword.length < 6)
      errs.newPassword = "Mật khẩu mới phải ít nhất 6 ký tự";
    return errs;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);

    // Kiểm tra mật khẩu hiện tại
    if (user.newPassword && user.password !== "admin1") {
      setErrors({ password: "Mật khẩu hiện tại không đúng." });
      return;
    }

    setErrors({});
    setSuccess("Cập nhật thông tin thành công!");
    setEditing(false);
  };

  return (
    <div className="container py-4">
      <div className="card p-4 shadow" style={{ maxWidth: "600px", margin: "auto" }}>
        <h3 className="text-center text-danger mb-4">Thông tin cá nhân</h3>

        <div className="text-center mb-3">
          <img
            src={avatar || "https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/5862ce92aa8685e51ffb44249e495c36~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=c40cfff5&x-expires=1751346000&x-signature=cF%2F3NKQBJnlOizU2ImghngGVRs0%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my"}
            alt="avatar"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          {editing && (
            <div className="mt-2">
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>
          )}
        </div>

        {success && <div className="alert alert-success">{success}</div>}

        {!editing ? (
          <>
            <p><strong>Tên:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Điện thoại:</strong> {user.phone}</p>
            <p><strong>Trường:</strong> {user.school_name}</p>
            <p><strong>Địa chỉ:</strong> {user.address}</p>
            <button className="btn btn-outline-danger" onClick={() => setEditing(true)}>
              Cập nhật thông tin cá nhân
            </button>
          </>
        ) : (
          <form onSubmit={handleSave}>
            {["name", "email", "phone", "school_name", "address"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label">{field.replace("_", " ")}</label>
                <input
                  className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                  name={field}
                  value={user[field]}
                  onChange={handleChange}
                />
                {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
              </div>
            ))}

            <div className="mb-3">
              <label>Mật khẩu hiện tại</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={user.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                name="newPassword"
                className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                value={user.newPassword}
                onChange={handleChange}
              />
              {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
            </div>

            <div className="d-flex justify-content-between">
              <button className="btn btn-danger" type="submit">Lưu</button>
              <button className="btn btn-secondary" type="button" onClick={() => setEditing(false)}>Hủy</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
