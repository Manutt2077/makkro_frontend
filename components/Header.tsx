"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useUser } from "../hooks/useUser";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = useUser();

  useEffect(() => {
    setHydrated(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // o redirige a login
  };

  if (!hydrated) return null;

  return (
    <header
      className={`fixed top-0 w-full z-50 text-[#CBD5E1] px-6 py-4 transition-colors duration-500 border-b shadow-md ${
        scrolled
          ? "bg-black/25 backdrop-blur-lg border-white/5"
          : "shadow-none border-none bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        <h1 className="text-xl font-bold text-white">GymTrack</h1>

        <nav className="space-x-6 hidden md:block">
          <a href="#beneficios" className="hover:text-green-400 transition">
            Beneficios
          </a>
          <a href="#funciona" className="hover:text-green-400 transition">
            Cómo funciona
          </a>
          <a href="#contacto" className="hover:text-green-400 transition">
            Contacto
          </a>
        </nav>

        {user ? (
          <div className="flex items-center gap-3" ref={menuRef}>
            <span className="hidden md:inline text-sm">{user.id}</span>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <Image
                src={user.profileImage || "/profile/default_img_profile.svg"}
                alt="Foto de perfil"
                width={40}
                height={40}
                className="rounded-full hover:cursor-pointer"
              />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-50 w-56 bg-[#1f1f1f] border border-gray-700 rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-white font-medium">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <ul className="py-2">
                  <li>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition"
                    >
                      Ver perfil
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900 transition hover:cursor-pointer"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <a
            href="#registro"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition text-sm"
          >
            Unirme
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
