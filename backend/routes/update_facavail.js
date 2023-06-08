const express = require("express");
const router = express.Router();
const cors = require('cors');

const Adm_Faculty_Details = require("../models/faculty_details");

router.use(cors());
// Route to insert data into Adm_Panel_Schedule table
router.post("/", async (req, res) => {
  try {
    const { adm_faculty_id, adm_faculty_email, adm_area_id, adm_faculty_tag, adm_is_available, adm_can_take_aip} = req.body;

    // ToDo: We are only updating the Data not deleting and creationg new
    const updated = await Adm_Faculty_Details.update({
        adm_is_available:0
    },{
        where:{adm_faculty_id}
    });

    res.status(201).json(updated);
    // res.status(201).json(newFacdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;