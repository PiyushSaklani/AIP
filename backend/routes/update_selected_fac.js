const express = require("express");
const router = express.Router();
const cors = require('cors');

const Adm_Panelist_Allocation = require("../models/panelist_allocation");

router.use(cors());
// Route to insert data into Adm_Panel_Schedule table
router.post("/", async (req, res) => {
  try {
    const {adm_allocation_id, adm_faculty_id} = req.body;

    const updated_data = await Adm_Panelist_Allocation.update({
        adm_is_accepted : 0
    },{
        where:{adm_allocation_id,adm_faculty_id}
    });
    res.status(201).json(updated_data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;