const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const express = require("express");
const router = express.Router();

const { Adm_User } = require("../models/user");

router.post("/", async (req, res) => {
  try {
    const error = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    const { adm_email_id, adm_password } = req.body;
    const user = await Adm_User.findOne({ where: { adm_email_id } });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(adm_password, user.adm_password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    if (!user.adm_is_verified)
      return res.status(400).send("User not verified. Please verify.");

    const token = jwt.sign(
      _.pick(user, ["adm_user_id", "adm_user_name", "adm_email_id"]),
      config.get("jwtPrivatekey"),
      { expiresIn: "24h" }
    );
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

const validateUser = (user) => {
  const schema = Joi.object({
    adm_email_id: Joi.string().min(5).max(50).email().required(),
    adm_password: Joi.string().min(5).max(50).required(),
  });
  const result = schema.validate(user);
  return result.error;
};

module.exports = router;
