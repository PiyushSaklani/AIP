const Adm_Faculty_Details = require("../models/faculty_details");

async function populateAdmFacultyDetailsTable(timetableData) {
  try {
    for (const faculty of timetableData) {
      const newFaculty = await Adm_Faculty_Details.create({
        adm_faculty_name: faculty.name,
        adm_faculty_email: faculty.emailId,
        adm_area_id: 1,
        adm_faculty_tag: "Senior",
        adm_is_available: true,
        adm_can_take_aip: true,
        adm_entry_date: new Date(),
        adm_last_updated_date: new Date(),
        adm_is_deleted: false,
      });

      console.log(
        `Created new faculty record with ID ${newFaculty.adm_faculty_id}`
      );
    }

    console.log("Adm_Faculty_Details table populated successfully");
  } catch (error) {
    console.error("Error populating Adm_Faculty_Details table:", error);
  }
}

module.exports = { populateAdmFacultyDetailsTable };
