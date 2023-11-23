const { Router } = require("express");

const listaLibros = require("../../libros.json");

const router = Router();

// /api/libros/
router.get(`/`, (req, res) => {
  /* return res.json({
    ok: true,
    message: `lista de libros`,
    libros: listaLibros.libros,
  });
});*/
  fs.readFile("libros.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo libros.json", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    // Parsea los datos del JSON
    const librosData = JSON.parse(data);

    // Envía la lista de libros como respuesta
    return res.json({ libros: librosData });
  });
});
module.exports = router;

// query params
// api/libros/:libroId
router.get(`/:libroId`, (req, res) => {
  console.log("PARAMS", req.params);
  const libroId = req.params.libroId;

  if (isNaN(libroId)) {
    return res.status(400).json({
      ok: true,
      message: `no existe el usuario con el id ${libroId}`,
      queryParams: req.query,
    });
  }

  const libro = listaLibros.libros.find((l) => {
    return l.id === Number(libroId);
  });

  if (!libro) {
    return res.json({
      ok: true,
      message: `no existe el libro con el id ${libroId}`,
      libro,
      queryParamas: req.query,
    });
  }

  return res.json({ ok: true, message: `libros id: ${libroId}`, libro });
});

// /api/libros/
router.post(`/`, (req, res) => {
  const libroBody = req.body;
  console.log("🚀 ~ file: index.js:31 ~ router.post ~ libroBody", libroBody);
  const lastId = listaLibros.libros[listaLibros.libros.length - 1].id;
  const newLibro = { id: lastId + 1, ...userBody };
  res.json({ ok: true, message: `libro creado`, libro: newLibro });
});

module.exports = router;
