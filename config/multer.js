const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = crypto.randomBytes(8).toString("hex");
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueName}-${Date.now()}${extension}`);
  },
});

module.exports = multerConfig;
