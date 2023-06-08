const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Adm_Faculty_Details = require("./faculty_details");
const Adm_Panel_Schedule = require("./panel_schedule");


const Adm_Queue_Retain = sequelize.define("Adm_Queue_Retain", {
  adm_queue_retain_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  adm_queue_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: true,
    // references: {
    //   model: Adm_Panel_Schedule,
    //   key: "adm_panel_id",
    // },
  },
  adm_faculty_id: {
    // type: DataTypes.INTEGER,
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Adm_Faculty_Details,
      key: "adm_faculty_id",
    },
  },
  queue_position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  adm_entry_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  adm_last_updated_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  adm_is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

// Define association between Adm_Queue_Retain and Adm_Faculty_Details
Adm_Queue_Retain.belongsTo(Adm_Faculty_Details, {
  foreignKey: "adm_faculty_id",
});

// Adm_Queue_Retain.belongsTo(Adm_Faculty_Details, {
//   foreignKey: "adm_faculty_id",
//   ...cascade_dealing_config,
// });


module.exports = Adm_Queue_Retain;
