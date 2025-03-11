import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: { 
        type: String, required: true 
    },
    apellido: { 
        type: String, required: true 
    },
    edad: { 
        type: Number, min: 0, max: 120 
    },
    telefono: { 
        type: Number, required: true 
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'El correo debe tener un formato válido'],
      trim: true    
    },
    foto: { 
        type: String 
    }, // Campo para almacenar la ruta de la imagen
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Usuario', usuarioSchema);