const express = require("express");
const router = express.Router();

const Adm_User = require("../models/user");

router.get("/", async (req, res) => {
  const { adm_email_id } = req.body;
  const user = await Adm_User.findOne({ where: { adm_email_id } });

  if (!user) return res.status(400).send("Invalid email.");

  const token = jwt.sign(
    _.pick(user, ["adm_user_id", "adm_user_name", "adm_email_id"]),
    config.get("jwtPrivatekey"),
    { expiresIn: "24h" }
  );
});

module.exports = router;
