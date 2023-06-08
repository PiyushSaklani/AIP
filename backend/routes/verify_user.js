const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");

const { Adm_User } = require("../models/user");

router.put("/:token", async (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, config.get("jwtPrivatekey"));
    if (!payload) return res.status(400).send("Invalid Token!");

    const user = await Adm_User.findOne({
      where: {
        adm_user_id: payload.userId,
      },
    });

    if (!user) {
      return res.status(400).send("Invalid Token!");
    }

    if (user.adm_is_verified) {
      return res.send("User already verified");
    }

    await user.update({
      adm_is_verified: true,
    });

    return res.send("User Verification Successful!");
  } catch (error) {
    return res.status(400).send("Invalid Token!");
  }
});

module.exports = router;
