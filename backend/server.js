const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Crear una nueva app de Express
const app = express();
const port = 3001;

// Middleware para analizar JSON
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://mongo:27017/cruddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Definir un esquema y modelo para los elementos
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

// Rutas CRUD

// GET: Obtener todos los elementos
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error al obtener los elementos');
  }
});

// POST: Crear un nuevo elemento
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(500).send('Error al crear el elemento');
  }
});

// PUT: Actualizar un elemento existente
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).send('Error al actualizar el elemento');
  }
});

// DELETE: Eliminar un elemento
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
  } catch (error) {
    res.status(500).send('Error al eliminar el elemento');
  }
});

// Ruta básica
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Aplicación escuchando en http://localhost:${port}`);
});
