import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <header style={{ padding: 16 }}>
          <nav>
            <Link to="/" style={{ marginRight: 12 }}>
              Home
            </Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <main style={{ padding: 16 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </LanguageProvider>
    </BrowserRouter>
  );
}
