/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Login = () => {
  const { login } = useAuth();
  const { loadCart } = useCart();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    try {
      await login(formData);
      loadCart();
      
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "Bienvenido de nuevo!",
      });
    } catch (error: any) {
      console.error("Error en el login:", error);
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text:
          `${error.response.data.message}` ||
          `Hubo un error desconocido ${error}`,
      });
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dqiehommi/image/upload/v1737912176/pexels-sukh-winder-3740393-5611633_y1bx8n.jpg')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-black bg-opacity-80 p-10 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-4xl font-bold mb-6 text-white text-center">
          Iniciar Sesión
        </h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <div className="mb-6">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition font-bold"
        >
          INICIAR SESIÓN
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-4">
            O inicia sesión con tu cuenta Gmail:
          </p>
          <Link
            href="https://club-active-center.vercel.app/api/auth/login"
            className="w-full mt-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition font-bold"
          >
            Iniciar sesión con Google
          </Link>

          <div className="mt-4 text-gray-300">
            <p className="text-sm">¿Aún no tienes una cuenta?</p>
            <Link
              href="/Registro"
              className="text-blue-500 hover:text-blue-400 transition font-semibold"
            >
              Regístrate aquí
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
