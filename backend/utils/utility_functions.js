const config = require("config");

const { Adm_User } = require("../models/user");
const Adm_Area = require("../models/area");
const Adm_Faculty = require("../models/faculty");
const Adm_Panel_Schedule = require("../models/panel_schedule");
const Adm_Panelist_Allocation = require("../models/panelist_allocation");
const Adm_Queue_Retain = require("../models/queue_retain");
const Adm_Faculty_Details = require("../models/faculty_details");
const Adm_Combinations = require("../models/faculty_combinations");

require("../models/assosiations/assosiations");

const sequelizeSync = async () => {
  try {
    await Adm_User.sync();
    await Adm_Area.sync();
    await Adm_Faculty_Details.sync();
    await Adm_Faculty.sync();
    await Adm_Combinations.sync();
    await Adm_Panel_Schedule.sync();
    await Adm_Queue_Retain.sync();
    await Adm_Panelist_Allocation.sync();
  } catch (error) {
    console.error("Unable to sync:", error);
  }
};

const checkConfigVariables = () => {
  if (!config.get("dbUrl")) {
    console.log("FATAL ERROR: dbUrl is not defined.");
    process.exit(1);
  }

  if (config.get("dbName")) {
    console.log(config.get("dbName"));
  }

  if (!config.get("dbName")) {
    console.log("FATAL ERROR: dbName is not defined.");
    process.exit(1);
  }

  if (!config.get("dbUserName")) {
    console.log("FATAL ERROR: dbUserName is not defined.");
    process.exit(1);
  }

  if (!config.get("dbPassword")) {
    console.log("FATAL ERROR: dbPassword is not defined.");
    process.exit(1);
  }

  if (!config.get("jwtPrivatekey")) {
    console.log("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
  }

  // if (!config.get("nuAipUserName")) {
  //   console.log("FATAL ERROR: nuAipUserName is not defined.");
  //   process.exit(1);
  // }

  // if (!config.get("nuAipPassword")) {
  //   console.log("FATAL ERROR: nuAipPassword is not defined.");
  //   process.exit(1);
  // }
};

module.exports = { sequelizeSync, checkConfigVariables };
