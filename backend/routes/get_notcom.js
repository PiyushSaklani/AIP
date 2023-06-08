const express = require("express");
const router = express.Router();
const cors = require('cors');

const Adm_Combinations = require("../models/faculty_combinations");

router.use(cors());
// Route to insert data into Adm_Panel_Schedule table
router.post("/", async (req, res) => {
  try {
    // Extracting data from the request body
    const { adm_faculty_id_1, adm_faculty_id_2} = req.body;

    const newCombination = await Adm_Combinations.findAll({
        where:{adm_faculty_id_1,adm_is_deleted:0}
    });

    // Sending a success response
    res.status(201).json(newCombination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;