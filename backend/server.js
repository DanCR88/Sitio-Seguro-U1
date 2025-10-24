const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente ✅");
});

app.post("/", (req, res) => {
  const { nombre, mensaje } = req.body;
  console.log("Datos recibidos:", nombre, mensaje);
  res.json({ success: true, message: "Datos recibidos con éxito" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
