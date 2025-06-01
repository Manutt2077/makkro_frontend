"use client";

import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hydrated) {
    // Opcionalmente, renderizar un placeholder mientras
    return null;
  }
  
  return (
    <header
      className={`fixed top-0 w-full z-50 text-[#CBD5E1] px-6 py-4 transition-colors duration-500 border-b shadow-md ${
        scrolled
          ? "bg-black/25 backdrop-blur-lg border-white/5"
          : "shadow-none border-none bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">GymTrack</h1>
        <nav className="space-x-6 hidden md:block">
          <a href="#beneficios" className="hover:text-green-400 transition">Beneficios</a>
          <a href="#funciona" className="hover:text-green-400 transition">Cómo funciona</a>
          <a href="#contacto" className="hover:text-green-400 transition">Contacto</a>
        </nav>
        <a
          href="#registro"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition text-sm"
        >
          Unirme
        </a>
      </div>
    </header>
  );
};

export default Header;
