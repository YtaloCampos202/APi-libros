const express = require("express");
const displayRouter = require("express-routemap");
const cors = require("cors");

const librosRouter = require("./routes/libros.routes");

const PORT = process.env.PORT || 8080;

const app = express();

const BASE_PREFIX = process.env.BASE_PREFIX || "api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/static", express.static(`${__dirname}/public`));

app.get(`/`, (req, res) => {
  return res.json({ message: `API DEPLOY SUCCESS` });
});

app.get(`/${BASE_PREFIX}/alive`, (req, res) => {
  return res.json({
    message: `Hola hiciste tu 1ra APi, y esta ejecutandose en RAILWAY.APP- ${process.env.NODE_ENV}`,
  });
});

app.use(`/${BASE_PREFIX}/libros`, librosRouter);
//
app.listen(PORT, () => {
  displayRouter(app);
  console.log(`API RUNNING ON PORT ${PORT}`);
});
