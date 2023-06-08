const express = require("express");
const router = express.Router();
const cors = require("cors");

const Adm_Panelist_Allocation = require("../models/panelist_allocation");
const Adm_Panel_Schedule = require("../models/panel_schedule");
const Adm_Faculty_Details = require("../models/faculty_details");

router.use(cors());

// Route to get data from Adm_Panel_Schedule table by adm_panel_id
router.post("/", async (req, res) => {
  try {
    const Panel_allocation_data = await Adm_Panelist_Allocation.findAll({
      where: { adm_is_deleted: 0, adm_is_accepted: 1 },
    });
    const Panel_schedule_data = await Adm_Panel_Schedule.findAll({
        where: { adm_is_deleted: 0},
      });
    const Faculty_details = await Adm_Faculty_Details.findAll({
        where: { adm_is_deleted: 0},
      });

    const currentDate = new Date();

    const filtered_panel_scheduled_data = await Panel_schedule_data.filter((row) => row.adm_date.toISOString() >= new Date(currentDate).toISOString());

    console.log("Test : ",Panel_schedule_data)

    res.send({Panel_allocation_data,Panel_schedule_data,Faculty_details});
    // res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
