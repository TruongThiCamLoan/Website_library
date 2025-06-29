import React, { useState } from "react";
import { useParams } from "react-router-dom";
import books from "../data/books";
import BookCard from "../components/BookCard";

export default function FilteredBooksPage() {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const filteredBooks = books.filter((book) => {
    const bookCategory =
      typeof book.category === "string"
        ? book.category.toLowerCase()
        : book.category?.name?.toLowerCase();
    return bookCategory === category.toLowerCase();
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center text-primary">
        📚 Thể loại: <em>{category}</em>
      </h3>

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
        {currentBooks.map((book) => (
          <div key={book.id} className="col">
            <BookCard book={book} />
          </div>
        ))}
      </div>

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="mt-4 d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                  Back
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
