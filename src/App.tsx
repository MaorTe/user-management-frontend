import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layouts/Header";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import CarsPage from "./pages/CarsPage";

const App: React.FC = () => (
  <>
    <Header />
    <main className="container my-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </>
);

export default App;
