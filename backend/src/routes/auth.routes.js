import { Router } from "express";
import { login, register, logout, profile, getUsu, getUsuario, deleteUsu, updateUsu } from "../controllers/auth.controller.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../img')); 
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname);
    const nombre = req.body.nombre.replace(/\s+/g, '');
    const apellido = req.body.apellido.replace(/\s+/g, '');
    const telefono = req.body.telefono.replace(/\s+/g, '');
    const nombreFoto = `${nombre}${apellido}${telefono}${extension}`;
    req.body.nombreFoto = nombreFoto;
    callback(null, nombreFoto); 
  }
});

const upload = multer({ storage });

const router = Router();

// Rutas de autorización
router.post('/login', login);
router.post('/logout', logout);
router.post('/register', upload.single('foto'), register);
router.get('/profile', profile);

// Rutas de usuarios
router.get('/usuarios', getUsu); 
router.get('/usuario/:id', getUsuario);  
router.delete('/usuario/:id', deleteUsu); 
router.put('/usuario/:id', upload.single('foto'), updateUsu);  

export default router;
