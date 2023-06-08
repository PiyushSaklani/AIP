const { errorMonitor } = require("nodemailer/lib/xoauth2");
const Adm_Area = require("../models/area");

const createArea = async (adm_area_name) => {
  try {
    await Adm_Area.create({
      adm_area_name: adm_area_name,
    });
    console.log("Area Created Successfully!");
  } catch (error) {
    console.error("Area Creation Failed!", error);
  }
};

const getAreaName = async (id) =>{
  try {
    const area = await Adm_Area.findOne({ where: { adm_area_id: id } })
    return area.adm_area_name
  } catch (error) {
    
  }
}

module.exports = {
  createArea,
  getAreaName
};

