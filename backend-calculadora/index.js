const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Alimento = require('./models/Alimento');

const app = express();
app.use(express.json());
app.use(cors());

// Tu llave de conexión exitosa
const MONGO_URI = 'mongodb+srv://4lex87mc_db_user:gPCTl7JsRoJwxqBc@calculadorafit.snbn21j.mongodb.net/?appName=CalculadoraFit';

mongoose.connect(MONGO_URI)
  .then(() => console.log('🔥 ¡Conectado exitosamente a MongoDB Atlas en la nube!'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: '¡El backend de la Calculadora Fit está funcionando al 100%!' });
});

// 1. RUTA PARA OBTENER TODOS LOS ALIMENTOS / DIETAS
app.get('/alimentos', async (req, res) => {
  try {
    const alimentos = await Alimento.find();
    res.json(alimentos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los alimentos' });
  }
});

// 2. RUTA PARA AGREGAR UN NUEVO ALIMENTO A LA NUBE
app.get('/alimentos/crear-prueba', async (req, res) => {
  try {
    const nuevoAlimento = new Alimento({
      nombre: "Pechuga de pollo con arroz y verduras",
      tipo: "Almuerzo",
      calorias: 480,
      proteinas: 45,
      carbohidratos: 50,
      grasas: 10,
      porcion: "200g pechuga, 1 taza arroz, brócoli al gusto"
    });
    await nuevoAlimento.save();
    res.json({ mensaje: '¡Alimento de prueba guardado en la nube con éxito!', nuevoAlimento });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el alimento' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// 3. RUTA PARA CARGAR UN MENÚ VARIADO A LA NUBE
app.get('/alimentos/cargar-menu', async (req, res) => {
  try {
    const menuInicial = [
      {
        nombre: "Pechuga de pollo con arroz y verduras",
        tipo: "Almuerzo",
        calorias: 480,
        proteinas: 45,
        carbohidratos: 50,
        grasas: 10,
        porcion: "200g pechuga, 1 taza arroz, brócoli al gusto"
      },
      {
        nombre: "Avena proteica con plátano y crema de cacahuate",
        tipo: "Desayuno",
        calorias: 400,
        proteinas: 25,
        carbohidratos: 55,
        grasas: 10,
        porcion: "1 taza de avena, 1 scoop de proteína, 1 plátano, 1 cda crema de cacahuate"
      },
      {
        nombre: "Salmón a la plancha con puré de papa",
        tipo: "Cena",
        calorias: 520,
        proteinas: 38,
        carbohidratos: 40,
        grasas: 22,
        porcion: "180g filete de salmón, 1 taza de puré de papa, ensalada verde"
      },
      {
        nombre: "Yogurt griego con frutos rojos y almendras",
        tipo: "Snack",
        calorias: 250,
        proteinas: 20,
        carbohidratos: 22,
        grasas: 8,
        porcion: "1 taza yogurt griego sin azúcar, 1/2 taza frutos rojos, 15g de almendras"
      }
    ];

    // Limpiamos lo anterior y cargamos el nuevo menú fresco
    await Alimento.deleteMany({});
    await Alimento.insertMany(menuInicial);

    res.json({ mensaje: '¡Menú nutricional cargado exitosamente en la nube!', total: menuInicial.length });
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar el menú' });
  }
});