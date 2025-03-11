import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';

const FormularioUsuario = () => {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
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
  const [error, setError] = useState(""); 

  // Si hay un ID, obtenemos los datos del usuario
  useEffect(() => {
    if (id) {
      const getUsuario = async () => {
        try {
          const res = await axios.get(`http://localhost:3333/mern2/usuario/${id}`);
          setUsuario(res.data); 
        } catch (error) {
          console.error('Error al obtener usuario', error);
        }
      };
      getUsuario();
    }
  }, [id]);

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
      if (id) {
        // Si hay un ID, estamos editando
        await axios.put(`https://mern-socios.vercel.app/mern2/usuario/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Si no hay un ID, estamos creando un nuevo usuario
        await axios.post('https://mern-socios.vercel.app/mern2/register', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      
      setUsuario(valorInicial);
      setFoto(null);
      navigate('/'); // Redirigir al home
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error al conectar con el servidor');
    }
  };

  return (
    <>
    <Header />

    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{id ? 'Editar Socio' : 'Crear Socio'}</h2>
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
            {id ? 'Actualizar Socio' : 'Crear Socio'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default FormularioUsuario;
