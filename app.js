const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb://18.188.14.249/tecsup', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definición del Esquema de Alumnos
const AlumnoSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  curso: String,
  promedio: Number
});
const Alumno = mongoose.model('Alumno', AlumnoSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para registrar un alumno
app.post('/registrar', async (req, res) => {
  try {
    const alumno = new Alumno(req.body);
    await alumno.save();
    res.redirect('/listar.html');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Ruta para listar alumnos
app.get('/listar', async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Inicia el servidor
const port = 3000;
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));