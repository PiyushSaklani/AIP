const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Adm_Faculty_Details = require("./faculty_details");

const Adm_Combinations = sequelize.define("Adm_Combinations", {
  adm_combination_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  adm_faculty_id_1: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Adm_Faculty_Details,
      key: "adm_faculty_id",
    },
  },
  adm_faculty_id_2: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Adm_Faculty_Details,
      key: "adm_faculty_id",
    },
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


module.exports = Adm_Combinations;
