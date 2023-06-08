const express = require("express");
const router = express.Router();
const cors = require("cors");

const Adm_Faculty = require("../models/faculty");
const Adm_Faculty_Details = require("../models/faculty");

router.use(cors());

// Route to get data from Adm_Panel_Schedule table by adm_panel_id
router.post("/", async (req, res) => {
  try {
    const result = await Adm_Faculty.findAll({where:{
        "adm_is_deleted":0,
    }});

    res.send(result)
    // res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
