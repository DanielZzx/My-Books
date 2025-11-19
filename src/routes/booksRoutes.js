const express = require("express");

const path = require("path");
const multerConfig = require("../../config/multer");
const multer = require("multer");
const Book = require("../models/Book");
const user = require("../models/User");
const router = express.Router();

const upload = multer({ storage: multerConfig });

router.post("/books", upload.single("pdf"), async (req, res) => {
  try {
    const pdfPath = req.file ? req.file.filename : null;
    const newBook = new Book({ pdfPath: pdfPath, owner: req.body.owner });
    await newBook.save();
    console.log(newBook);
    res.status(200).json({ message: "Livro salvo!", book: newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.get("/books", async (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/books.html"));
});

module.exports = router;
