const express = require("express");
const { validation, searchUser } = require("../../controllers/validation");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { user, password, confirmPassword } = req.body;

    console.log("tentativa de registro", req.body);

    const result = validation(password, confirmPassword);
    if (!result.valid) {
      return res.status(400).json({
        error: true,
        message: result.message,
      });
    }

    const newUser = new User({ user, password });
    await newUser.save();

    res.status(200).json({
      message: "dados recebidos no back-end!",
      userId: newUser._id,
      user: user,
    });
    console.log("login concluido!");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { user, password } = req.body;

  const result = await searchUser(user, password);

  if (result.ok === true) {
    res.status(200).json({ message: result.message, user: user });
  }
  if (result.ok === false) {
    res.status(400).json({ message: result.message });
  }
});

module.exports = router;
