const config = require("config");
const Sequelize = require("sequelize");

const dbUrl = config.get("dbUrl");
const dbName = config.get("dbName");
const dbUserName = config.get("dbUserName");
const dbPassword = config.get("dbPassword");
const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  host: dbUrl,
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true,
    },
  },
});

const sequelizeAuthenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

sequelizeAuthenticate();

module.exports = sequelize;
