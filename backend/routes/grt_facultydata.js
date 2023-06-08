const express = require("express");
const router = express.Router();
const cors = require("cors");

const Adm_Faculty_Details = require("../models/faculty_details");

router.use(cors());

// Route to get data from Adm_Panel_Schedule table by adm_panel_id
router.post("/", async (req, res) => {
  try {
    console.log("Working")
    // res.send("Hello")
    const result = await Adm_Faculty_Details.findAll({where:{adm_is_deleted:0,adm_can_take_aip:1}});
    // console.log(result)
    // // Return the row as JSON
    res.send(result)
    // res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
