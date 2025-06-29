import React from "react";
import { useLocation } from "react-router-dom";
import books from "../data/books";
import BookCard from "../components/BookCard";

export default function SearchPage() {
  const { search } = useLocation();
  const keyword = new URLSearchParams(search).get("keyword")?.toLowerCase() || "";

  const filteredBooks = books.filter(({ title, year, author, authors, category }) => {
    const titleMatch = (title || "").toLowerCase().includes(keyword);
    const yearMatch = String(year || "").includes(keyword);

    const authorNames = typeof author === "string"
      ? author
      : (authors || []).map(a => a.name).join(", ");
    const authorMatch = authorNames.toLowerCase().includes(keyword);

    const categoryName = typeof category === "string"
      ? category
      : category?.name || "";
    const categoryMatch = categoryName.toLowerCase().includes(keyword);

    return titleMatch || yearMatch || authorMatch || categoryMatch;
  });

  return (
    <div className="container py-4 min-vh-100">
      <h2 className="mb-4 text-center">
        Kết quả tìm kiếm: <em>"{keyword}"</em>
      </h2>

      {filteredBooks.length === 0 ? (
        <div className="alert alert-warning text-center">
          ❌ Không tìm thấy quyển sách nào phù hợp.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
          {filteredBooks.map((book) => (
            <div key={book.id} className="col">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
