// Servidor Express para mi-sitio-seguro
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'mensajes.json');

app.use(helmet());
app.use(cors({
  origin: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Endpoint para recibir mensajes y guardarlos en mensajes.json
app.post('/api/contacto', (req, res) => {
  const { nombre, mensaje } = req.body || {};
  if(!nombre || !mensaje) {
    return res.status(400).json({ success: false, message: 'Faltan campos' });
  }
  const nuevo = {
    nombre: String(nombre),
    mensaje: String(mensaje),
    fecha: new Date().toISOString()
  };

  // Leer archivo, agregar y guardar (manejo básico de concurrencia)
  try {
    let arr = [];
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8') || '[]';
      arr = JSON.parse(raw);
      if(!Array.isArray(arr)) arr = [];
    }
    arr.push(nuevo);
    fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), { encoding: 'utf8' });
    return res.status(200).json({ success: true, message: 'Mensaje recibido con éxito' });
  } catch (err) {
    console.error('Error guardando mensaje:', err);
    return res.status(500).json({ success: false, message: 'Error interno' });
  }
});

// Fallback para rutas (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor seguro corriendo en http://localhost:${PORT}`);
});
