import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import {
  Home, Search, BookDetail, FilteredBooksPage,
  Login, Register, ForgotPassword, ChangePassword,
  BorrowHistory, Profile, AdminDashboard
} from "./pages";

function AppContent() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isLibrarian = localStorage.getItem("role") === "librarian";

  const hideLayoutRoutes = ["/login", "/register", "/forgot-password", "/change-password","/profile"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      {!hideLayout && <Header />}
      <div className="flex-grow-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/category/:category" element={<FilteredBooksPage />} />

          {/* Auth */}
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={isLoggedIn ? <ChangePassword /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />

          {/* User only */}
          <Route path="/history" element={isLoggedIn ? <BorrowHistory /> : <Navigate to="/login" />} />

          {/* Admin only */}
          <Route path="/library-management" element={isLoggedIn && isLibrarian ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
