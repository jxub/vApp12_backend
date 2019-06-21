const bcrypt = require("bcrypt");
const conn = require("../config/conn");

const SALT_ROUNDS = 10;

const getUser = async (mail, connection = conn) => {
  const u = await connection
    .select("*")
    .from("users")
    .where("mail", mail)
    .limit(1);

  return u[0];
};

const userExists = async (mail, connection = conn) => {
  const u = await getUser(mail, connection);

  return !!u;
};

const createAuth = async password => {
  let [salt, hash, err] = [null, null, null];
  try {
    salt = await bcrypt.genSalt(SALT_ROUNDS);
    hash = await bcrypt.hash(password, salt);
  } catch (e) {
    err = e.message;
  }
  return [salt, hash, err];
};

module.exports = {
  getUser,
  userExists,
  createAuth
};
