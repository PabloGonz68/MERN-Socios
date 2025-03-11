import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const res = await axios.get("http://localhost:3333/mern2/usuarios");
        setUsuarios(res.data);
      } catch (error) {
        console.error("Error al obtener usuarios", error);
      }
    };
    getUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:3333/mern2/usuario/${id}`);
      setUsuarios(usuarios.filter((usuario) => usuario._id !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <h1 className="text-center text-3xl font-bold text-gray-800 mt-6">Bienvenido a la página de inicio de Real Madrid</h1>

      <div className="flex flex-wrap justify-center mt-6">
        {usuarios.map((usuario) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" key={usuario._id}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={usuario.foto}
                alt={`Foto de ${usuario.nombre}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h5 className="text-lg font-semibold text-gray-800">{usuario.nombre}</h5>
                <p className="text-gray-600">Apellidos: {usuario.apellido}</p>
                <p className="text-gray-600">Edad: {usuario.edad}</p>
                <p className="text-gray-600">Teléfono: {usuario.telefono}</p>
                <p className="text-gray-600">Correo: {usuario.correo}</p>
              </div>
              <div className="p-4 flex justify-center gap-3">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                  onClick={() => eliminarUsuario(usuario._id)}
                >
                  Eliminar
                </button>
                <Link
                  to={`/editarUsuario/${usuario._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                >
                  Editar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;