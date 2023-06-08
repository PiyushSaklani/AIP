
const Adm_Panel_Schedule = require("../models/panel_schedule");
const Adm_Panelist_Allocation = require("../models/panelist_allocation");
const Adm_Panel_Allocation = require("../models/panelist_allocation");


async function getQueueIDTAccepted() {

  const queRetid = await Adm_Panelist_Allocation.findOne({
    where: { adm_is_accepted: true },
  });
  console.log(queRetid);
  return queRetid.adm_queue_retain_id
}


async function getPanelID(date, area, panelNumber, batch) {
  // Get the top faculty from the queue for the given panel id
  // console.log(date,area,panelNumber);
  date = date+" 0:00:00 +00:00"
  console.log(date,area,panelNumber);
  const panel = await Adm_Panel_Schedule.findOne({
    where: {
      adm_date: date,
      adm_area_id: area,
      adm_panel_number: panelNumber,
      adm_batch: batch,
    },
    
  }
  
  );

  if (panel) {
    return panel.adm_panel_id;
  } else {
    throw new Error(
      `Panel not found for date ${date}, area ${area}, and panel number ${panelNumber}`
    );
  }
}


function allocatePanelist(facultyId, queueRetainId, panelId) {
  const allocation = {
    adm_faculty_id: facultyId,
    adm_queue_retain_id: queueRetainId,
    adm_panel_id: panelId,
  }
  return allocation;
}
module.exports = {getQueueIDTAccepted, getPanelID, allocatePanelist}