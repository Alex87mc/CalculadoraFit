const mongoose = require('mongoose');

const alimentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true }, // Ej. "Desayuno", "Almuerzo", "Cena"
  calorias: { type: Number, required: true },
  proteinas: { type: Number, required: true },
  carbohidratos: { type: Number, required: true },
  grasas: { type: Number, required: true },
  porcion: { type: String, required: true } // Ej. "200g de pollo y 1 taza de arroz"
});

module.exports = mongoose.model('Alimento', alimentoSchema);