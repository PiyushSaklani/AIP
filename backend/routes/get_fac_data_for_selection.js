const express = require("express");
const router = express.Router();
const cors = require("cors");

const Adm_Area = require("../models/area");
const Adm_Faculty = require("../models/faculty");
const Adm_Faculty_Details = require("../models/faculty_details");

router.use(cors());

router.post("/", async (req, res) => {
  try {
    const Area_data = await Adm_Area.findAll({
      where: { adm_is_deleted: 0},
    });
    const Faculty_data = await Adm_Faculty.findAll({
        where: { adm_is_deleted: 0},
      });
    const Faculty_details = await Adm_Faculty_Details.findAll({
        where: { adm_is_deleted: 0, adm_can_take_aip:1},
      });

    res.send({Area_data, Faculty_data, Faculty_details});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
