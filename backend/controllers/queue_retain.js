

const Adm_Queue_Retain = require("../models/queue_retain");
const Adm_Panel_Schedule = require("../models/panel_schedule");
const Adm_Faculty_Details = require("../models/faculty_details");
const sequelize = require("../utils/db")
const { Op } = require('sequelize');

function createFacultyQueuePositions(facultyIds,panelID) {
    // converting to array
    // facultyIds = Array.from(facultyIds);

    // console.log(facultyIds)

    var queue_position = 1;
    let result = [];
    
    for (let facultyId of facultyIds["Senior"]) {
        console.log(queue_position);
      //   const newQueueEntry = await Adm_Queue_Retain.create({
      //   adm_queue_id: panelID+"Senior",
      //   adm_faculty_id: facultyId,
      //   queue_position: queue_position,
      // });
      result.push({
        adm_queue_id: panelID+"Senior",
        adm_faculty_id: facultyId,
        queue_position: queue_position,
      });
      // console.log("New queue entry created:", newQueueEntry.toJSON());
      queue_position++;
    }
    queue_position = 1;
    for (let facultyId of facultyIds["Junior"]) {
        console.log(queue_position);
      //   const newQueueEntry = await Adm_Queue_Retain.create({
      //   adm_queue_id: panelID+"Junior",
      //   adm_faculty_id: facultyId,
      //   queue_position: queue_position,
      // });
      result.push({
        adm_queue_id: panelID+"Junior",
        adm_faculty_id: facultyId,
        queue_position: queue_position,
      });
      // console.log("New queue entry created:", newQueueEntry.toJSON());
      queue_position++;
    }

    return result;
}


async function getTopQueue(queueID) {

  const queueList = await Adm_Queue_Retain.findAll({
    where: { adm_queue_id: queueID },
    include: [{ model: Adm_Faculty_Details }],
  });

  const facultyIds = queueList.map((queueItem) => queueItem["dataValues"]["adm_faculty_id"].trim());
  return facultyIds
}


async function getTopFacFromQueue(queueID) {
    
  // Get the top faculty from the queue for the given panel id
  const topFacQueueEntry = await Adm_Queue_Retain.findOne({
    where: { adm_queue_id: queueID, queue_position: 1 },
    include: [{ model: Adm_Faculty_Details }],
  });

  

  // console.log(Object.getOwnPropertyNames(topFacQueueEntry));
//   [
//     'dataValues',
//     '_previousDataValues',
//     'uniqno',
//     '_changed',
//     '_options',
//     'isNewRecord',
//     'Adm_Faculty_Detail'
//   ]
  // console.log(topFacQueueEntry["_previousDataValues"]["queue_position"]);
  // console.log(topFacQueueEntry["Adm_Faculty_Detail"]);

  if (topFacQueueEntry) {
    // Get the current queue length
    const queueLength = await Adm_Queue_Retain.count({
      where: { adm_queue_id: queueID },
    });
    // console.log(queueLength,"---> Queue Length")

    // Update the queue position of the top faculty
    
    // await Adm_Queue_Retain.update(
    //   { queue_position: sequelize.literal('queue_position - 1') },
    //   { where: { adm_faculty_id: topFacQueueEntry["dataValues"]["adm_faculty_id"] } }
    // );

    await Adm_Queue_Retain.update(
      { queue_position: sequelize.literal('queue_position - 1') },
      {
        where: {
          adm_queue_id: queueID,
          // queue_position: { [Op.gt]: 1 },
        },
      }
    );
  }

  if (topFacQueueEntry!=null) {
    return topFacQueueEntry["dataValues"]["adm_faculty_id"]
  } else {
    return null
  }
  
  // return topFacQueueEntry["dataValues"]["adm_faculty_id"]
  // console.log(Object.getOwnPropertyNames(topFacQueueEntry));

}

async function initialiseQueue(params) {
    
}

async function getQueueRetainId(queueID, facultyId, queuePosition) {
  // console.log(queueID, facultyId, queuePosition,"====");
  const queueRetain = await Adm_Queue_Retain.findOne({
    where: {
      adm_queue_id: queueID,
      // adm_faculty_id: facultyId,
      // queue_position: queuePosition,
    },
  });

  if (queueRetain) {
    return queueRetain.adm_queue_retain_id;
  } else {
    throw new Error(
      `Queue retain record not found for faculty ID ${facultyId} and queue position ${queuePosition}`
    );
  }
}

module.exports= {  getTopQueue, getTopFacFromQueue, getQueueRetainId, createFacultyQueuePositions } 