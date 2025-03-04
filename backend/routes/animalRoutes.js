const express = require('express');
const Animal = require('../models/Animal');

const router = express.Router();

// Obtener todos los animales
router.get('/listar', async (req, res) => {
    try {
        const animales = await Animal.find();
        res.json(animales);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los animales", error });
    }
});
// Endpoint para obtener todos los animales
router.get('/', async (req, res) => {
    try {
        const animales = await Animal.find(); // Obtiene todos los animales de la BD
        res.json(animales);
    } catch (error) {
        console.error("❌ Error al obtener los animales:", error);
        res.status(500).json({ mensaje: "Error al obtener los animales" });
    }
});
const verificarToken = require('../middlewares/authMiddleware'); // Importamos el middleware

// 📌 Agregar un nuevo animal (protegido)
router.post('/agregar', verificarToken, async (req, res) => {
    try {
        const { idAnimal, nombre, especie, dosis, fechaAplicacion } = req.body;
        const nuevoAnimal = new Animal({ idAnimal, nombre, especie, dosis, fechaAplicacion });
        await nuevoAnimal.save();
        res.json({ mensaje: "✅ Animal agregado correctamente", animal: nuevoAnimal });
    } catch (error) {
        console.error("❌ Error al agregar:", error);
        res.status(500).json({ mensaje: "Error al agregar el animal" });
    }
});

// 📌 Actualizar dosis de un animal (protegido)
router.put('/actualizar/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { dosis } = req.body;

        const animalActualizado = await Animal.findOneAndUpdate(
            { idAnimal: id },
            { dosis },
            { new: true }
        );

        if (!animalActualizado) {
            return res.status(404).json({ mensaje: "🐾 Animal no encontrado" });
        }

        res.json({ mensaje: "✏️ Dosis actualizada", animal: animalActualizado });
    } catch (error) {
        console.error("❌ Error al actualizar:", error);
        res.status(500).json({ mensaje: "Error al actualizar el animal" });
    }
});

// 📌 Eliminar un animal (protegido)
router.delete('/eliminar/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;

        const animalEliminado = await Animal.findOneAndDelete({ idAnimal: id });

        if (!animalEliminado) {
            return res.status(404).json({ mensaje: "🐾 Animal no encontrado" });
        }

        res.json({ mensaje: "🗑️ Animal eliminado con éxito!", animal: animalEliminado });
    } catch (error) {
        console.error("❌ Error al eliminar:", error);
        res.status(500).json({ mensaje: "Error al eliminar el animal" });
    }
});


module.exports = router;
