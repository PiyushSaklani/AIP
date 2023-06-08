const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
const Adm_Area = require("./area");
const Adm_Faculty = require("./faculty");

const Adm_Faculty_Details = sequelize.define("Adm_Faculty_Details", {
  adm_faculty_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  adm_faculty_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adm_faculty_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adm_area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  adm_faculty_tag :{
    type: DataTypes.STRING,
    defaultValue: "SR",
    allowNull: false,
  },
  adm_is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  adm_can_take_aip: {
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


Adm_Faculty_Details.belongsTo(Adm_Area, {
  foreignKey: {
    name: "adm_area_id",
    allowNull: false,
  },
});

module.exports = Adm_Faculty_Details;
