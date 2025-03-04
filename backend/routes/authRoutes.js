const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const SECRET_KEY = "memes_xD"; // ¡Cámbiala por una clave más segura!

// 📌 Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Verificar si el usuario ya existe
        const usuarioExistente = await User.findOne({ username });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: "❌ El usuario ya existe" });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const nuevoUsuario = new User({ username, password: passwordHash });
        await nuevoUsuario.save();

        res.json({ mensaje: "✅ Usuario registrado con éxito" });
    } catch (error) {
        console.error("❌ Error en registro:", error);
        res.status(500).json({ mensaje: "Error en el registro" });
    }
});

// 📌 Inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Buscar usuario en la BD
        const usuario = await User.findOne({ username });
        if (!usuario) {
            return res.status(400).json({ mensaje: "❌ Usuario o contraseña incorrectos" });
        }

        // Comparar contraseñas
        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) {
            return res.status(400).json({ mensaje: "❌ Usuario o contraseña incorrectos" });
        }

        // Generar token JWT
        const token = jwt.sign({ id: usuario._id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ mensaje: "✅ Inicio de sesión exitoso", token });
    } catch (error) {
        console.error("❌ Error en login:", error);
        res.status(500).json({ mensaje: "Error en el inicio de sesión" });
    }
});

module.exports = router;
