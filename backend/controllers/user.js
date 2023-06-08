const Adm_User = require("../models/user");

async function createUsers(
  adm_name,
  adm_user_name,
  adm_email_id,
  adm_password
) {
  try {
    await Adm_User.create({
      adm_name: adm_name,
      adm_user_name: adm_user_name,
      adm_email_id: adm_email_id,
      adm_password: adm_password,
    });
    console.log("User created successfully.");
  } catch (error) {
    console.error("Unable to create users:", error);
  }
}

module.exports = {
  createUsers,
};
