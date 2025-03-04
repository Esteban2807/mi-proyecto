const express = require("express");
const bcrypt = require("bcryptjs"); // Para encriptar la contraseña
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Ruta para registrar usuario
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ mensaje: "El usuario ya está registrado" });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario en la base de datos
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ mensaje: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error });
    }
});
// Ruta para login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

module.exports = router;
