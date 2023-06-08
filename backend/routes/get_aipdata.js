const express = require("express");
const router = express.Router();
const cors = require("cors");

const Adm_Panel_Schedule = require("../models/panel_schedule");

router.use(cors());

// Route to get data from Adm_Panel_Schedule table by adm_panel_id
router.get("/", async (req, res) => {
  try {
    const {
      adm_date,
      adm_start_time,
      adm_end_time,
      adm_batch,
      adm_panel_number,
    } = req.body;

    //! By this code we can get the data of specific date.
    // const result = await Adm_Panel_Schedule.findAll({ where: { adm_date } });
    //! This is to delete the data.
    // const result = await Adm_Panel_Schedule.destroy({ where: { adm_date } });

    const result = await Adm_Panel_Schedule.findAll();
    const filteredResult = await result.filter(
      (row) => row.adm_date.toISOString() > new Date(adm_date).toISOString()
    );

    // console.log(filteredResult)

    // Return the row as JSON
    // res.json(result);
    res.json(filteredResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
