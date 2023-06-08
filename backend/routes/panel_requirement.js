const config = require("config");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const requirement_data = req.body;
  console.log(requirement_data);
  res.send(requirement_data);
});

module.exports = router;
