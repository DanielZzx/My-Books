const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  pdfPath: String,
  owner: { type: mongoose.Schema.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Book", BookSchema);
