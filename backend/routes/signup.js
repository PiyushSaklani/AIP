const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");
const { Adm_User, validateUser } = require("../models/user");
const sendEmail = require("../utils/email");

const generateVerificationToken = (userId) => {
  const payload = { userId };
  return jwt.sign(payload, config.get("jwtPrivatekey"), { expiresIn: "0.25h" });
};

router.get("/", (req, res) => {
  res.send("Verge of registering!");
});

router.post("/", async (req, res) => {
  try {
    const { adm_name, adm_user_name, adm_email_id, adm_password } = req.body;
    const error = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    const user = await Adm_User.findOne({
      where: {
        [Op.or]: [{ adm_email_id }, { adm_user_name }],
      },
    });

    if (user) {
      if (user.adm_email_id === adm_email_id) {
        return res.status(400).send("Email ID already registered!");
      }
      return res.status(400).send("Username is already taken!");
    }

    const newUser = {
      adm_name,
      adm_user_name,
      adm_email_id,
      adm_password,
    };
    const salt = await bcrypt.genSalt(10);
    newUser.adm_password = await bcrypt.hash(adm_password, salt);

    const createdUser = await Adm_User.create(newUser);
    const token = generateVerificationToken(createdUser.adm_user_id);

    const message = "Please click the link below to verify your self";
    const subject = "AIP Planner Verification";
    const verificationLink = `localhost:1000/api/verify_user/${token}`;
    console.log(verificationLink)
    await sendEmail(
      createdUser.adm_email_id,
      subject,
      createdUser.adm_user_name,
      message,
      verificationLink
    );

    res.send("Email Sent!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
