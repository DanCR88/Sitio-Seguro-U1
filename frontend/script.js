document.getElementById("contactoForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = e.target.nombre.value;
  const mensaje = e.target.mensaje.value;
  const resultado = document.getElementById("resultado");
  resultado.innerText = "Enviando...";

  try {
    const resp = await fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, mensaje })
    });
    const data = await resp.json();
    if(data && data.success) {
      resultado.innerText = data.message;
      e.target.reset();
    } else {
      resultado.innerText = data.message || "Error al enviar";
    }
  } catch (err) {
    console.error(err);
    resultado.innerText = "Error de red al enviar";
  }
});
