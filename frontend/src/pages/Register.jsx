import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const valorInicial = {
    nombre: '',
    apellido: '',
    edad: 18,
    telefono: '',
    correo: '',
    password: '',
    foto: ''
  };

  const [usuario, setUsuario] = useState(valorInicial);
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState(""); // Estado para el error

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const capturarFoto = (e) => {
    setFoto(e.target.files[0]);
  };

  const guardarDatos = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', usuario.nombre);
    formData.append('apellido', usuario.apellido);
    formData.append('edad', usuario.edad);
    formData.append('telefono', usuario.telefono);
    formData.append('correo', usuario.correo);
    formData.append('password', usuario.password);
    if (foto) {
      formData.append('foto', foto);
    }

    try {
      await axios.post('http://localhost:3333/mern2/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUsuario({ ...valorInicial });
      setFoto(null);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        // Mostrar un mensaje de error si el usuario ya existe
        setError(error.response.data.message || "Error desconocido");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>} {/* Mostrar el mensaje de error */}

        <form onSubmit={guardarDatos}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Ingresa tu nombre"
              required
              name="nombre"
              value={usuario.nombre}
              onChange={capturarDatos}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Ingresa tu apellido"
              required
              name="apellido"
              value={usuario.apellido}
              onChange={capturarDatos}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Edad</label>
            <input
              type="number"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Ingresa tu edad"
              required
              name="edad"
              value={usuario.edad}
              onChange={capturarDatos}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Ingresa tu número de teléfono"
              required
              name="telefono"
              value={usuario.telefono}
              onChange={capturarDatos}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Ingresa tu correo"
              required
              name="correo"
              value={usuario.correo}
              onChange={capturarDatos}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              placeholder="Ingresa tu contraseña"
              required
              name="password"
              value={usuario.password}
              onChange={capturarDatos}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Foto</label>
            <input
              type="file"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              onChange={capturarFoto}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Crear Cuenta
          </button>
        </form>
        <div className="mt-4 text-center">
  <p className="text-sm text-gray-600">¿Ya tienes cuenta? <button 
    className="text-blue-600 hover:underline"
    onClick={() => navigate("/login")}>
    Iniciar sesión
  </button></p>
</div>

      </div>
    </div>
  );
};

export default Register;
