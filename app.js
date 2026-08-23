const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const homeRouter = require("./src/routes/indexRouter") // rota para home page
 const authRouter = require("./src/routes/authRouter"); // Rota de registro de usuario
const booksRouter = require("./src/routes/booksRouter"); // Rota para adicionar pdf
require("./config/dataBase");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));


app.use("/", homeRouter)
app.use("/", authRouter);
app.use("/", booksRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3002, () => {
  console.log("Servidor rodando em http://localhost:3002");
});
