const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Adm_Panel_Schedule = require("./panel_schedule");
const Adm_Faculty_Details = require("./faculty_details");
const Adm_Queue_Retain = require("./queue_retain");

const Adm_Panelist_Allocation = sequelize.define("Adm_Panelist_Allocation", {
  adm_allocation_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  adm_faculty_id: {
    // type: DataTypes.INTEGER,
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Adm_Faculty_Details,
      key: "adm_faculty_id",
    },
  },
  adm_queue_retain_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Adm_Queue_Retain,
      key: "adm_queue_retain_id",
    },
  },
  adm_panel_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Adm_Panel_Schedule,
      key: "adm_panel_id",
    },
  },
  adm_is_accepted: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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

Adm_Panelist_Allocation.belongsTo(Adm_Panel_Schedule, {
  foreignKey: {
    name: "adm_panel_id",
    allowNull: false,
  },
});
// Adm_Panelist_Allocation.belongsTo(Adm_Faculty_Details, {
//   foreignKey: {
//     name: "adm_panel_id",
//     allowNull: false,
//   },
// });
// Adm_Panelist_Allocation.hasMany(Adm_Faculty_Details, {
//   foreignKey: {
//     name: "adm_faculty_id",
//     allowNull: false,
//   },
// });

module.exports = Adm_Panelist_Allocation;
