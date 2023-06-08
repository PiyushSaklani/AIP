const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");

const userSchema = {
  adm_user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  adm_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adm_user_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  adm_email_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  adm_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adm_is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
};

const Adm_User = sequelize.define("Adm_User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    adm_name: Joi.string().min(5).max(30).required(),
    adm_user_name: Joi.string().min(3).max(30).required(),
    adm_email_id: Joi.string().email().required(),
    adm_password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\\[\\]\\|;:'\",.<>/?-])(?=.*\\d)(?=.*[a-zA-Z]).{8,}$"
        )
      )
      .required()
      .messages({
        "string.pattern.base":
          "Must be 8+ chars, 1+ uppercase, 1+ special char, 1+ digit. ",
      }),
  });
  const result = schema.validate(user);
  return result.error;
};

module.exports = { Adm_User, validateUser };
