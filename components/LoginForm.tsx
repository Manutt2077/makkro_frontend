"use client";
import { useState } from "react";
import api from "../lib/api"; 
import axios from "axios"; 

// Tipos para la respuesta de tu backend
interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    imgProfile: string;
  };
}


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      // Hacer petición a tu backend
      const response = await api.post<LoginResponse>(
        '/users/login',
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token, user } = response.data;

      // Guardar en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Configurar axios para futuras peticiones
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setSuccess(true);
      console.log('Login exitoso:', user);

 
      setTimeout(() => {
        window.location.href = '/'; 
      }, 1500);

    } catch (err: unknown) {
   console.error('Error en login:', err);

      let errorMessage = 'Error al iniciar sesión';

      if (axios.isAxiosError(err)) {
        // Usar directamente el mensaje del backend
        errorMessage = err.response?.data?.message || err.message || 'Error de conexión';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto p-4 bg-gray-900 rounded">
      <h2 className="text-white text-xl font-bold">Iniciar Sesión</h2>

      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500 text-red-400 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-500/20 border border-green-500 text-green-400 rounded">
          ¡Login exitoso! Redirigiendo...
        </div>
      )}

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
        disabled={loading}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
        disabled={loading}
      />

      <button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-500 text-white p-2 rounded disabled:opacity-50 
        disabled:cursor-not-allowed transition-colors"
        disabled={loading}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};

export default LoginForm;