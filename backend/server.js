const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Inicializar Express
const app = express();
app.use(express.json());  // 👈 ¡IMPORTANTE!
app.use(cors());

// Conectar MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB 🚀"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Importar rutas
const animalRoutes = require('./routes/animalRoutes');
app.use('/animales', animalRoutes);  // 👈 ¡IMPORTANTE!

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


app.get('/animales', (req, res) => {
    res.send("📋 API de animales funcionando correctamente!");
});

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);


