const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Adm_Area = require("./area");

const Adm_Panel_Schedule = sequelize.define("Adm_Panel_Schedule", {
  adm_panel_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  adm_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  adm_start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  adm_end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  adm_batch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adm_panel_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  adm_area_id: {
    type: DataTypes.INTEGER,
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

Adm_Panel_Schedule.belongsTo(Adm_Area, {
  foreignKey: {
    name: "adm_area_id",
    allowNull: false,
  },
});

module.exports = Adm_Panel_Schedule;
