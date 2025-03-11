import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, edad, foto, password } = req.body;

    if (!nombre || !correo || !apellido || !telefono) {
      return res.status(400).json({ message: 'El nombre, apellidos, teléfono y correo son obligatorios' });
    }

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Ya existe un usuario con este correo' });
    }

    const nombreFoto = req.body.nombreFoto || 'noFoto.png';
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const usuario = new Usuario({
      nombre,
      apellido,
      correo,
      telefono,
      edad,
      foto: nombreFoto,
      password: passwordHash
    });

    const usuarioGuardado = await usuario.save();

    res.status(201).json({
      id: usuarioGuardado._id,
      nombre: usuarioGuardado.nombre,
      apellido: usuarioGuardado.apellido,
      correo: usuarioGuardado.correo,
      telefono: usuarioGuardado.telefono,
      edad: usuarioGuardado.edad,
      foto: usuarioGuardado.foto,
      createdAt: usuarioGuardado.createdAt,
      updatedAt: usuarioGuardado.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const login = async(req, res) => {
    try {
      const { correo, password } = req.body;

      if (!correo || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios' });
      }

      const userFound = await Usuario.findOne({ correo });
      if (!userFound) {
        return res.status(400).json({ message: 'El usuario no existe' });
      }

      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'La contraseña es incorrecta' });
      }

      res.status(201).json({
        id: userFound._id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        correo: userFound.correo,
        telefono: userFound.telefono
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    res.status(200).json({ message: 'Logout exitoso' });
}

export const profile = async(req, res) => {
  const userFound = await Usuario.findById(req.params.id);

  if (!userFound) {
    return res.status(400).json({ message: 'El usuario no existe' });
  }
    return res.json({
        id: userFound._id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        correo: userFound.correo,
        telefono: userFound.telefono,
        edad: userFound.edad,
        foto: userFound.foto,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}



export const getUsu = async (req, res) => { // Obtener todos los usuarios
  try {
    const usuarios = await Usuario.find();
    const usuariosConFoto = usuarios.map(usuario => ({
      ...usuario._doc,
      foto: usuario.foto
        ? `http://localhost:3333/img/${usuario.foto}`
        : `http://localhost:3333/img/noFoto.png`, // Imagen por defecto si no hay foto
    }));
    res.json(usuariosConFoto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
  }
};

export const getUsuario = async (req, res) => { // Obtener un usuario por ID
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
  }
};

export const deleteUsu = async (req, res) => { // Eliminar un usuario
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Eliminar la foto del servidor si existe
    if (usuario.foto && usuario.foto !== 'noFoto.png') {
      const filePath = path.join(__dirname, '../img', usuario.foto);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error al eliminar la foto:', err);
          return res.status(500).json({ message: 'Error al eliminar la foto', error: err.message });
        }
      });
    }

    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
};

export const updateUsu = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, edad, password } = req.body;
    const foto = req.file ? req.body.nombreFoto : undefined; // Captura la foto si existe

    // Buscar el usuario actual para obtener la foto antigua
    const usuarioActual = await Usuario.findById(req.params.id);
    if (!usuarioActual) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Eliminar la foto antigua del servidor si existe y si se ha subido una nueva foto
    if (foto && usuarioActual.foto && usuarioActual.foto !== 'noFoto.png') {
      const filePath = path.join(__dirname, '../img', usuarioActual.foto);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error al eliminar la foto antigua:', err);
          return res.status(500).json({ message: 'Error al eliminar la foto antigua', error: err.message });
        }
      });
    }

    // Si se proporciona una nueva contraseña, cifrarla antes de guardarla
    let updatedPassword = usuarioActual.password; // Mantener la contraseña actual si no se cambia
    if (password) {
      const salt = await bcrypt.genSalt(10); // Generar un "salt"
      updatedPassword = await bcrypt.hash(password, salt); // Cifrar la nueva contraseña
    }

    // Encuentra y actualiza el usuario, incluyendo la contraseña cifrada si se cambió
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { 
        nombre, 
        apellido, 
        correo, 
        telefono, 
        edad, 
        password: updatedPassword, // Solo actualizar la contraseña si se envió una nueva
        ...(foto && { foto }) // Solo actualizar la foto si se envió una nueva
      }, 
      { new: true }
    );

    res.json({ message: 'Usuario actualizado', usuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};