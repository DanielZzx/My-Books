const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: String,
  password: String,
  books: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Book",
    },
  ],
});
module.exports = mongoose.model("User", userSchema);
