const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
