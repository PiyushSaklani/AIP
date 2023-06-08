const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Adm_Faculty_Details = require("./faculty_details");

const Adm_Faculty = sequelize.define("Adm_Faculty", {
  adm_faculty_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  adm_faculty_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    // primaryKey: true,
  },
  adm_rejection_frequency: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  adm_no_of_aips: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  adm_priority: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
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

Adm_Faculty_Details.hasMany(Adm_Faculty, {
  foreignKey: {
    name: "adm_faculty_id",
    allowNull: false,
  },
});

module.exports = Adm_Faculty;
