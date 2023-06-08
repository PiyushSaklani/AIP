const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const Adm_Area = sequelize.define("Adm_Area", {
  adm_area_id: {
    type: DataTypes.INTEGER,
    // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  adm_area_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adm_entry_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  adm_entry_user_id: {
    type: DataTypes.UUID,
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

module.exports = Adm_Area;
