import React from "react";
import BookList from "../components/BookList";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <div className="min-vh-100 bg-light">
      <main className="container py-4">
        <div className="row justify-content-center mb-5">
          <div className="col-md-10">
            <div
              id="bookCarousel"
              className="carousel slide carousel-fade shadow-sm"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner rounded">
                {[
                  {
                    img: "https://listsach.com/wp-content/uploads/2020/05/bia-sach-dep-top-sach-hay-bia-dep-tang-ban-be-nguoi-yeu.jpg",
                    title: "Không gian học tập lý tưởng",
                    desc: "Thư viện hiện đại, yên tĩnh, đầy đủ tài liệu",
                    active: true,
                  },
                  {
                    img: "https://cdn.baolaocai.vn/images/afaec9937c6b7f52cca20a1d3ca791a1c8c73c8fcf635cc52c5f103b3211ccf87f04473782bd94f2b9b735092d2fb1123bf164fd6dcd271b5d560dd9d5dd79a4/bs-giai1a-982-1504.jpg",
                    title: "Kho sách đa dạng",
                    desc: "Từ sách giáo trình, kỹ năng, văn học, nghiên cứu",
                  },
                  {
                    img: "https://bizweb.dktcdn.net/100/490/482/files/thiet-ke-bia-sach-thieu-nhi-1-tuelamlinh.jpg?v=1694260486812",
                    title: "Thư viện số thông minh",
                    desc: "Tra cứu, mượn sách online nhanh chóng, dễ dàng",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${item.active ? "active" : ""}`}
                  >
                    <img src={item.img} className="d-block w-100" alt={item.title} />
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                      <h5>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#bookCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#bookCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-center mb-4">📚 Danh Mục Sách</h2>
        <BookList />
      </main>
    </div>
  );
}
