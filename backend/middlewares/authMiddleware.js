const jwt = require('jsonwebtoken');

const SECRET_KEY = "memes_xD"; // Usa la misma clave del login

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ mensaje: "🚫 Acceso denegado. No hay token." });
    }

    try {
        const verificado = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.usuario = verificado;
        next(); // Continua con la ejecución
    } catch (error) {
        res.status(401).json({ mensaje: "❌ Token inválido" });
    }
};

module.exports = verificarToken;
