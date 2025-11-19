const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/livros_app", {})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro na conexão com MongoDB:", err));
