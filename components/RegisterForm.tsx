"use client";
import api from "../lib/api"; 
import axios from "axios"; 
import { useState } from "react";


// Íconos
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
);

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(""); // Limpiar error previo
  setLoading(true);

  try {
    const response = await api.post("/users/register", {
      user_id: userId,
      name,
      email,
      password,
    });

    // Registro exitoso
    console.log("Usuario registrado:", response.data);
    // Aquí puedes redireccionar o mostrar mensaje de éxito
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Tu API devuelve: { "error": "mensaje de error" }
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "Error del servidor";
      
      setError(errorMessage);
      
      // Log para debugging
      console.error("Error de registro:", {
        status: error.response?.status,
        data: error.response?.data
      });
      
    } else {
      setError("Error de conexión. Verifica tu conexión a internet.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="py-20 bg-[#151516] max-w-2xl w-full mx-auto   flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center mt-10 mb-12">
        <h2 className="text-4xl font-bold  text-center mb-5" >Crea tu cuenta</h2>
        <span className="text-2xl block w-max mx-auto text-[#CBD5E1]">y empieza a cambiar el resultado de tus dias</span>
      </div>
      <div className="p-8 bg-[#161B21]/60 h-full w-[70%] backdrop-blur-3xl rounded-xl border border-white/10 shadow text-white ">

        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-md flex items-start">
            <span className="flex-shrink-0 text-red-500 mr-2 mt-0.5">
              <AlertIcon />
            </span>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-11">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
              <UserIcon />
            </span>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800/60 text-white px-10 py-3 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder:text-white/60"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
              <UserIcon />
            </span>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full bg-gray-800/60 text-white px-10 py-3 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder:text-white/60"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
              <MailIcon />
            </span>
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800/60 text-white px-10 py-3 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder:text-white/60"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
              <LockIcon />
            </span>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800/60 text-white px-10 py-3 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder:text-white/60"
              required
            />
          </div>
          
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
              <LockIcon />
            </span>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800/60 text-white px-10 py-3 rounded-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 transition placeholder:text-white/60"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className=" block mx-auto w-[300px] bg-gradient-to-r  from-green-500 via-green-500 to-teal-500 text-white font-semibold py-3 rounded-md shadow-md hover:opacity-90 transition
             disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer"
          >
            {loading ? "Procesando..." : "Registrarse"}
          </button>
          <p className="text-center text-[#CBD5E1]">
            ¿Ya tienes una cuenta? 
            <a href="http://localhost:3000/login" className="text-teal-500 font-bold hover:cursor-pointer">Inicia Sesión</a></p>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
