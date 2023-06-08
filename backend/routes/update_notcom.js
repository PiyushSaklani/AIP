const express = require("express");
const router = express.Router();
const cors = require('cors');

const Adm_Combinations = require("../models/faculty_combinations");

router.use(cors());
// Route to insert data into Adm_Panel_Schedule table
router.post("/", async (req, res) => {
  try {
    const { adm_faculty_id_1, adm_faculty_id_2} = req.body;

    const updated = await Adm_Combinations.update({
        adm_is_deleted: 1,
    },{
        where:{adm_faculty_id_1}
    });

    res.status(201).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;