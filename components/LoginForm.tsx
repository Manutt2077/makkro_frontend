"use client";

import { useState } from "react";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");


  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto p-4 bg-gray-900 rounded">
      <h2 className="text-white text-xl font-bold">Iniciar Sesión</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white"
        required
      />

      <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white p-2 rounded">
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;
