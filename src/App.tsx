import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import { LanguageProvider } from "./context/LanguageContext";
import "./styles/colors.css";
import "./styles/typography.css";
import "./styles/contact.css";

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}
