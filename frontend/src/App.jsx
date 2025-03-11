import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import FormularioUsuario from "./pages/FormularioUsuario"; // Verifica que la ruta sea correcta
import { Navigate } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/crearUsuario" element={<FormularioUsuario/>} />
        <Route path="/editarUsuario/:id" element={<FormularioUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
