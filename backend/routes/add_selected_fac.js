const express = require("express");
const router = express.Router();
const cors = require("cors");

const Adm_Panelist_Allocation = require("../models/panelist_allocation");

router.use(cors());

// Route to insert data into Adm_Panelist_Allocation table
router.post("/", async (req, res) => {
  try {
    const { adm_faculty_id, adm_panel_id, adm_is_accepted , adm_queue_retain_id} = req.body;

    // Create a new record in the Adm_Panelist_Allocation table
    const newAllocation = await Adm_Panelist_Allocation.create({
      adm_faculty_id,
      adm_queue_retain_id,
      adm_panel_id,
      adm_is_accepted,
    });

    res.status(201).json(newAllocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;