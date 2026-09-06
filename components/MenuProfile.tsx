"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useUser } from "../hooks/useUser"; 

const ProfileMenu = () => {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen((prev) => !prev)} className="focus:outline-none">
        <Image
          src={user.profileImage || "/default-avatar.png"}
          alt="Perfil"
          width={36}
          height={36}
          className="rounded-full border border-white hover:opacity-80 transition"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1f1f1f] text-white rounded shadow-lg z-50 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          <ul className="divide-y divide-white/5">
            <li>
              <a href="/perfil" className="block px-4 py-3 hover:bg-white/10">Ver perfil</a>
            </li>
            <li>
              <a href="/ajustes" className="block px-4 py-3 hover:bg-white/10">Configuración</a>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
                className="w-full text-left px-4 py-3 hover:bg-red-500/20 text-red-400"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
