const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    idAnimal: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    especie: { type: String, required: true },
    dosis: { type: String, required: true },
    fechaAplicacion: { type: Date, required: true }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
