const User = require("../models/User");

function validation(password, samePassword) {
  if (!password || !samePassword) {
    return { valid: false, message: "Campos de senha não podem estar vazios" };
  }
  if (password !== samePassword) {
    return { valid: false, message: "As senhas não coincidem!" };
  }
  return { valid: true };
}

async function searchUser(user, password) {
  const userExist = await User.findOne({ user: user });

  if (!userExist) {
    return { ok: false, message: "usuario não encontrado!" };
  }
  if (userExist.password !== password) {
    return { ok: false, message: "senha incorreta!" };
  }
  return { ok: true, message: "login concluido!", user: userExist };
}

module.exports = { validation, searchUser };
