import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

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

// 👇 ESTA LÍNEA ES CRUCIAL
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

