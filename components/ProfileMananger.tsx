"use client";
import Modal from "./Modal";
import React from "react";
import { useEffect, useState } from "react";
import api from "../lib/api";
import axios from "axios";
import Image from "next/image";
import { useUser } from "../hooks/useUser";

const PeopleManagementPage: React.FC = () => {
  const user = useUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEmailOpen, setModalEmailOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errorChangePassword, setErrorChangePassword] = useState("");
  const [passwordChangeSuccessMessage, setpasswordChangeSuccessMessage] =
    useState("");
  const [errorChangeEmail, setErrorChangeEmail] = useState("");
  const [emailChangeSuccessMessage, setEmailChangeSuccessMessage] =
    useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [currentUserId, setCurrentUserId] = useState("");
  const [passwordEmail, setPasswordEmail] = useState("");
  const [nameUser, setNameUser] = useState(user?.name || "");
  const [userId, setUserId] = useState(user?.id || "");
  const [loading, setLoading] = useState(false);
  const [errorUpdateUserData, setErrorUpdateUserData] = useState("");

  const passwordRequirements = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
  };

  useEffect(() => {
    if (user?.name) {
      setNameUser(user.name);
    }
  }, [user?.name]);

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user?.email]);

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorChangeEmail("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("Token JWT:", token);
      const response = await api.post(
        "/users/profile/email/change",

        {
          userId: currentUserId,
          currentPassword: passwordEmail,
          newEmail: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmailChangeSuccessMessage(response.data.message);

      setErrorChangeEmail("");
      console.log("Response de cambio de correo:", response.data);
      setTimeout(() => {
        setModalEmailOpen(false);
        setEmailChangeSuccessMessage(""); 
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Error del servidor";
        setErrorChangeEmail(errorMessage);
      } else {
        setErrorChangeEmail(
          "Error de conexión. Verifica tu conexión a internet."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log("Token JWT:", token);
      const response = await api.patch(
        "/users/profile/update",
        {
          id: userId,
          name: nameUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userString = localStorage.getItem("user");

      if (userString) {
        const user = JSON.parse(userString);
        user.name = nameUser; // ✅ aquí sí puedes asignar
        localStorage.setItem("user", JSON.stringify(user));
      }
      console.log("Response de actualización de datos:", response.data);
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Error del servidor";
        setErrorUpdateUserData(errorMessage);
        console.error("Error al actualizar datos:", errorMessage);
      } else {
        setErrorUpdateUserData(
          "Error de conexión. Verifica tu conexión a internet."
        );
      }
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorChangePassword("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log("Token JWT:", token);
      const response = await api.patch(
        "/users/profile/password/update",
        {
          userId: user?.id,
          currentPassword,
          newPassword,
          confirmNewPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response de cambio de contraseña 2:", confirmPassword);
      console.log("Response de cambio de contraseña 1:", newPassword);
      setpasswordChangeSuccessMessage(response.data.message);
      setErrorChangePassword("");
      console.log("Cambio de contraseña exitoso:", response.data);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setModalOpen(false);
        setpasswordChangeSuccessMessage(""); 
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
      
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Error del servidor";
        setErrorChangePassword(errorMessage);
      } else {
        setErrorChangePassword(
          "Error de conexión. Verifica tu conexión a internet."
        );
      }
    } finally {
      setLoading(false);
    }

    
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Datos de la cuenta
      </h1>

   
      <div className="bg-[#181919] border border-white/10 shadow  rounded-lg  p-6 mb-8">
        <h2 className="text-xl font-semibold text-[#4ade80] mb-6">
          Datos de usuario
        </h2>

     
        <form onSubmit={handleUpdateUserData}>
          <div className="space-y-4 ">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className=" text-teal-500 bold">Nombre</label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  onChange={(e) => setNameUser(e.target.value)}
                  placeholder="Nombre"
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-[#4ade80] text-white"
                />
              </div>
              <div className="flex-1">
                <label className="text-teal-500 bold">ID de usuario</label>
                <input
                  type="text"
                  defaultValue={user?.id}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="ID de usuario"
                  className="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-[#4ade80] text-white"
                />
              </div>
            </div>
          </div>
          {errorUpdateUserData && (
            <p className="text-red-500 text-[18px] text-center mb-2">
              {errorUpdateUserData}
            </p>
          )}
          <button
            type="submit"
            disabled={nameUser == user?.name && userId == user?.id}
            className={`flex mt-[20px]  mx-auto items-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95
              ${
                nameUser === user?.name && userId === user?.id
                  ? "bg-gray-800 shadow-md shadow-black/40 cursor-not-allowed"
                  : "bg-green-500/80 hover:bg-green-500 shadow-lg shadow-green-500/25 hover:cursor-pointer"
              }`}
          >
            Actualizar datos
          </button>
        </form>
      </div>

      <div className="rounded-lg  p-6 ">
        <h2 className="text-xl font-semibold text-[#4ade80] mb-4">
          Correo electronico
        </h2>

        <div className=" flex gap-4 items-end w-max-[60%]">
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              defaultValue={user?.email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-1/2 px-3 py-2 bg-[#000000]/ border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-[#4ade80]"
              placeholder="example.com"
            />
            <button
              onClick={() => setModalEmailOpen(true)}
              disabled={email == user?.email}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95
              ${
                email === user?.email
                  ? "bg-gray-800 shadow-md shadow-black/40 cursor-not-allowed"
                  : "bg-green-500/80 hover:bg-green-500 shadow-lg shadow-green-500/25 hover:cursor-pointer"
              }`}
            >
              Actualizar correo
            </button>
            <Modal
              isOpen={modalEmailOpen}
              onClose={() => setModalEmailOpen(false)}
              title="Cambiar correo electronico"
            >
              <form
                onSubmit={handleEmailChange}
                className="space-y-4 text-white"
              >
                <div className="flex flex-col relative w-full mb-[25px]">
                  <label
                    htmlFor="currentUserId"
                    className="mb-1 text-[18px] text-white"
                  >
                    Usuario
                  </label>

                  <input
                    type="text"
                    id="currentUserId"
                    value={currentUserId}
                    onChange={(e) => setCurrentUserId(e.target.value)}
                    name="currentUserId"
                    required
                    className="bg-[#22252A] border border-[#393B40] rounded-lg px-3 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
                  />
                </div>
                <div className="flex flex-col relative w-full mb-[25px]">
                  <label
                    htmlFor="passwordEmail"
                    className="mb-1 text-[19px]  text-white"
                  >
                    contraseña
                  </label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="passwordEmail"
                    name="passwordEmail"
                    required
                    value={passwordEmail}
                    onChange={(e) => setPasswordEmail(e.target.value)}
                    className="bg-[#22252A] border border-[#393B40] rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-3 top-[55px] transform  -translate-y-1/2 hover:cursor-pointer"
                    aria-label={
                      showNewPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                  >
                    <Image
                      src={
                        showNewPassword
                          ? "/icons/others/eye-open.svg"
                          : "/icons/others/eye-closed.svg"
                      }
                      alt="Mostrar/Ocultar"
                      width={28}
                      height={28}
                      className="opacity-70 hover:opacity-100 transition"
                    />
                  </button>
                </div>
                <div className="flex flex-col relative w-full mb-[50px]">
                  <label
                    htmlFor="email"
                    className="mb-1 text-[18px] text-white"
                  >
                    Nuevo correo
                  </label>

                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    required
                    className="bg-[#22252A] border border-[#393B40] rounded-lg px-3 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
                  />
                </div>
                {emailChangeSuccessMessage && (
                  <p className="text-green-500 text-sm text-center mb-2">
                    {emailChangeSuccessMessage}
                  </p>
                )}

                {errorChangeEmail && (
                  <p className="text-red-500 text-[18px] text-center mb-2">
                    {errorChangeEmail}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="mx-auto w-[40%] text-center flex justify-center items-center gap-2 bg-green-500/80
                            hover:bg-green-500 px-6 py-3 rounded-lg text-white font-medium shadow-lg shadow-green-500/25 
                              transition-all duration-200 hover:scale-105 active:scale-95 hover:cursor-pointer"
                >
                  {loading ? "Actualizando..." : "Actualizar"}
                </button>
              </form>
            </Modal>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
          <span>Te enviaremos un correo para confirmar el cambio</span>
        </div>
      </div>
      <div className="rounded-lg  p-6 ">
        <h2 className="text-xl font-semibold text-[#4ade80] mb-4">Seguridad</h2>
        <div className="flex justify-between items-center bg-[#1a1a1a] border border-white/10 shadow rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔒</span>
            <div>
              <p className="font-semibold">Contraseña</p>
              <p className="text-sm text-gray-500">
                Última actualización: hace 3 meses
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setModalOpen(true);
            }}
            className="flex items-center gap-2 bg-green-500/80 hover:bg-green-500 px-6 py-3 rounded-lg   
               text-white font-medium shadow-lg shadow-green-500/25 
                transition-all duration-200 hover:scale-105 active:scale-95 hover:cursor-pointer"
          >
            🔑 Cambiar Contraseña
          </button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Cambiar contraseña"
          >
            <form
              onSubmit={handlePasswordChange}
              className="space-y-4 text-white"
            >
              {/* Contraseña actual */}
              <div className="flex flex-col relative w-full">
                <label
                  htmlFor="currentPassword"
                  className="mb-1 text-sm text-white"
                >
                  Contraseña actual
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  name="currentPassword"
                  required
                  className="bg-[#22252A] border border-[#393B40] rounded-lg px-3 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[47px] transform -translate-y-1/2 hover:cursor-pointer"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  <Image
                    src={
                      showPassword
                        ? "/icons/others/eye-open.svg"
                        : "/icons/others/eye-closed.svg"
                    }
                    alt="Mostrar/Ocultar"
                    width={28}
                    height={28}
                    className="opacity-70 hover:opacity-100 transition"
                  />
                </button>
              </div>

              <div className="flex flex-col relative w-full">
                <label htmlFor="newPassword" className="mb-1">
                  Nueva contraseña
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-[#22252A] border border-[#393B40] rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-[47px] transform  -translate-y-1/2 hover:cursor-pointer"
                  aria-label={
                    showNewPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  <Image
                    src={
                      showNewPassword
                        ? "/icons/others/eye-open.svg"
                        : "/icons/others/eye-closed.svg"
                    }
                    alt="Mostrar/Ocultar"
                    width={28}
                    height={28}
                    className="opacity-70 hover:opacity-100 transition"
                  />
                </button>
              </div>

              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="mb-1">
                  Repetir nueva contraseña
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-[#22252A] border border-[#393B40] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4ade80]"
                />
              </div>

              <div className="bg-[#1A1D21] rounded-lg p-4 text-[#4b5563] text-sm">
                <p className="font-semibold text-white mb-2 text-[16px]">
                  Requisitos de contraseña:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li
                    style={{
                      color: passwordRequirements.minLength
                        ? "#4ade80"
                        : "#9ca3af",
                    }}
                  >
                    Al menos 8 caracteres
                  </li>
                  <li
                    style={{
                      color: passwordRequirements.hasUppercase
                        ? "#4ade80"
                        : "#9ca3af",
                    }}
                  >
                    Una letra mayúscula
                  </li>
                  <li
                    style={{
                      color: passwordRequirements.hasLowercase
                        ? "#4ade80"
                        : "#9ca3af",
                    }}
                  >
                    Una letra minúscula
                  </li>
                  <li
                    style={{
                      color: passwordRequirements.hasNumber
                        ? "#4ade80"
                        : "#9ca3af",
                    }}
                  >
                    Un número
                  </li>
                </ul>
              </div>
              {passwordChangeSuccessMessage && (
                <p className="text-green-500 text-sm text-center mb-2">
                  {passwordChangeSuccessMessage}
                </p>
              )}

              {errorChangePassword && (
                <p className="text-red-500 text-[18px] text-center mb-2">
                  {errorChangePassword}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mx-auto w-[40%] text-center flex justify-center items-center gap-2 bg-green-500/80
                            hover:bg-green-500 px-6 py-3 rounded-lg text-white font-medium shadow-lg shadow-green-500/25 
                              transition-all duration-200 hover:scale-105 active:scale-95 hover:cursor-pointer"
              >
                {loading ? "Actualizando..." : "Actualizar contraseña"}
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PeopleManagementPage;
