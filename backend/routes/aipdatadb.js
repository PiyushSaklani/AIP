const express = require("express");
const router = express.Router();
const cors = require('cors');

const Adm_Panel_Schedule = require("../models/panel_schedule");
const { getAreaName } = require("../controllers/area");

// Assuming the adm_area_id is stored in a variable called `id`


router.use(cors());
// Route to insert data into Adm_Panel_Schedule table
router.post("/", async (req, res) => {
  try {
    // Extracting data from the request body
    const { adm_date, adm_start_time, adm_end_time, adm_batch, adm_area_id,adm_panel_number } = req.body;

    const tags = ['Senior','Junior']
    // Creating a new row in Adm_Panel_Schedule table
    const newSchedule = await Adm_Panel_Schedule.create({
      // "2023-05-10ANNon-TechJunior"
      adm_date,
      adm_start_time,
      adm_end_time,
      adm_batch,
      adm_panel_number,
      adm_area_id
    });

    // Sending a success response
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;