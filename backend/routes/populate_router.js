const express = require("express");
const router = express.Router();
const axios = require("axios");
const config = require("config");

const { populateAdmFacultyDetailsTable } = require("../controllers/faculty");

router.get("/", async (req, res) => {
  try {
    const tokenResponse = await axios.post(
      "https://nucleus-stg.niituniversity.in/NUWebApi/api/Authenticate/Login",
      {
        userName: config.get("nuAipUserName"),
        password: config.get("nuAipPassword"),
      }
    );

    const accessToken = tokenResponse.data.token;

    const timetableResponse = await axios.get(
      "https://nucleus-stg.niituniversity.in/NUWebApi/api/TimeTable/GetFacultyTimetable",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const timetableData = timetableResponse.data.data;
    // populateAdmFacultyDetailsTable(timetableData)

    res.send(timetableData);
    // res.json({ message: 'Data populated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error populating data" });
  }
});

module.exports = router;
