import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    correo: "",
    password: ""
  });
  const [error, setError] = useState(""); // Estado para el error

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://mern-socios.vercel.app/mern2/login',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      navigate("/home"); // Redirige al home después de iniciar sesión
    } catch (error) {
      if (error.response && error.response.data) {
        // Maneja los errores del servidor (ejemplo: credenciales incorrectas o usuario no encontrado)
        setError(error.response.data.message || "Error desconocido");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>} {/* Mostrar el mensaje de error */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              name="correo"
              value={credentials.correo}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">¿Aún no estás registrado? <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/register")}>
            Crear cuenta
          </button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
