import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null); // Mantén el estado local para el usuario
  const [loading, setLoading] = useState(true); // Agregar un estado de carga

  // Simulando la carga del usuario, se puede adaptar según la lógica de tu aplicación
  React.useEffect(() => {
    setLoading(false); // Cuando se cargue el usuario, setLoading a false
  }, []);

  const logout = () => {
    setUser(null); // Limpiar el estado del usuario al hacer logout
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/home" className="flex items-center space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/sco/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png"
            alt="Real Madrid Logo"
            width="30"
            height="30"
            className="inline-block"
          />
          <span className="text-xl font-semibold">Real Madrid</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/home" className="hover:text-gray-300">Lista de Socios</Link>
          <Link to="/CrearUsuario" className="hover:text-gray-300">Crear Socio</Link>
          {user ? (
            <button onClick={logout} className="hover:text-gray-300">Logout</button>
          ) : (
            <Link to="/Login" className="hover:text-gray-300">Login</Link>
          )}
        </div>

        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="md:hidden">
        <div className="space-y-4 p-4">
          <Link to="/" className="block text-white hover:text-gray-300">Lista de Socios</Link>
          <Link to="/crearUsuario" className="block text-white hover:text-gray-300">Crear Socio</Link>
          {user ? (
            <button onClick={logout} className="block text-white hover:text-gray-300">Logout</button>
          ) : (
            <Link to="/Login" className="block text-white hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
