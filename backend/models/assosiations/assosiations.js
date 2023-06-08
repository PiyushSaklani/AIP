const Adm_Area = require("../area");
const Adm_Faculty = require("../faculty");
const Adm_Faculty_Details = require("../faculty_details");
const Adm_Panel_Schedule = require("../panel_schedule");
const Adm_Panelist_Allocaiton = require("../panelist_allocation");
const Adm_Queue_Retain = require("../queue_retain");
const Adm_Combinations = require("../faculty_combinations")
const { Adm_User } = require("../user");

const cascade_dealing_config = {
  allowNull: false,
  onDelete: "NO ACTION",
};

// One To Many RelationShip between Adm_User and All Other Tables.

Adm_User.hasMany(Adm_Faculty_Details, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_Faculty_Details.belongsTo(Adm_User, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_User.hasMany(Adm_Faculty_Details, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});
Adm_Faculty_Details.belongsTo(Adm_User, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});

Adm_User.hasMany(Adm_Area, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_Area.belongsTo(Adm_User, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_User.hasMany(Adm_Area, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});
Adm_Area.belongsTo(Adm_User, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});

Adm_User.hasMany(Adm_Faculty, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_Faculty.belongsTo(Adm_User, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_User.hasMany(Adm_Faculty, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});
Adm_Faculty.belongsTo(Adm_User, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});

Adm_User.hasMany(Adm_Panel_Schedule, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_Panel_Schedule.belongsTo(Adm_User, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_User.hasMany(Adm_Panel_Schedule, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});
Adm_Panel_Schedule.belongsTo(Adm_User, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});

Adm_User.hasMany(Adm_Panelist_Allocaiton, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_Panelist_Allocaiton.belongsTo(Adm_User, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_User.hasMany(Adm_Panelist_Allocaiton, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});
Adm_Panelist_Allocaiton.belongsTo(Adm_User, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});

Adm_User.hasMany(Adm_Queue_Retain, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_Queue_Retain.belongsTo(Adm_User, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_User.hasMany(Adm_Queue_Retain, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});
Adm_Queue_Retain.belongsTo(Adm_User, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});

Adm_User.hasMany(Adm_Combinations, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_Combinations.belongsTo(Adm_User, {
  foreignKey: "adm_entry_user_id",
  ...cascade_dealing_config,
});
Adm_Faculty_Details.hasMany(Adm_Combinations, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});
Adm_Combinations.belongsTo(Adm_Faculty_Details, {
  foreignKey: "adm_modified_user_id",
  ...cascade_dealing_config,
});




// ----------------------

Adm_Faculty_Details.hasMany(Adm_Queue_Retain, {
  foreignKey: "adm_faculty_id",
  ...cascade_dealing_config,
});
Adm_Queue_Retain.belongsTo(Adm_Faculty_Details, {
  foreignKey: "adm_faculty_id",
  ...cascade_dealing_config,
});

// Adm_Faculty_Details.hasMany(Adm_Combinations, {
//   foreignKey: "adm_faculty_id_1",
//   ...cascade_dealing_config,
// });
// Adm_Faculty_Details.belongsTo(Adm_Combinations, {
//   foreignKey: "adm_faculty_id_1",
//   ...cascade_dealing_config,
// });

// Adm_Faculty_Details.hasMany(Adm_Combinations, {
//   foreignKey: "adm_faculty_id_2",
//   ...cascade_dealing_config,
// });
// Adm_Faculty_Details.belongsTo(Adm_Combinations, {
//   foreignKey: "adm_faculty_id_2",
//   ...cascade_dealing_config,
// });

// Adm_Faculty table has one to many relation with Adm_Panelist_Allocaiton andAdm_Queue_Retain
// Adm_Faculty_Details.hasMany(Adm_Faculty, {
//   foreignKey: "adm_faculty_id",
//   ...cascade_dealing_config,
// });
// Adm_Faculty.belongsTo(Adm_Faculty_Details, {
//   foreignKey: "adm_faculty_id",
//   ...cascade_dealing_config,
// });

// Adm_Faculty_Details.hasMany(Adm_Panelist_Allocaiton, {
//   foreignKey: "adm_faculty_id",
//   ...cascade_dealing_config,
// });
// Adm_Panelist_Allocaiton.belongsTo(Adm_Faculty_Details, {
//   foreignKey: "adm_faculty_id",
//   ...cascade_dealing_config,
// });

// Adm_Faculty_Details.hasMany(Adm_Queue_Retain, {
//   foreignKey: "adm_faculty_id",
//   ...cascade_dealing_config,
// });
// Adm_Queue_Retain.belongsTo(Adm_Faculty_Details, {
//   foreignKey: "adm_faculty_id",
//   ...cascade_dealing_config,
// });

// Adm_Panel_Schedule has OneToMany relation with Adm_Panelist_Allocaiton, Adm_Queue_Retain
// Adm_Panel_Schedule.hasMany(Adm_Panelist_Allocaiton, {
//   foreignKey: "adm_panel_id",
//   ...cascade_dealing_config,
// });

// Adm_Panelist_Allocaiton.belongsTo(Adm_Panel_Schedule, {
//   foreignKey: "adm_panel_id",
//   ...cascade_dealing_config,
// });

// Adm_Panel_Schedule.hasMany(Adm_Queue_Retain, {
//   foreignKey: "adm_panel_id",
//   ...cascade_dealing_config,
// });

// Adm_Queue_Retain.belongsTo(Adm_Panel_Schedule, {
//   foreignKey: "adm_panel_id",
//   ...cascade_dealing_config,
// });


// Adm_Faculty with Area Table
// Adm_Area.hasMany(Adm_Faculty_Details, {
//   foreignKey: "adm_area_id",
//   ...cascade_dealing_config,
// });
// Adm_Faculty_Details.belongsTo(Adm_Area, {
//   foreignKey: "adm_area_id",
//   ...cascade_dealing_config,
// });

// Adm_Faculty with
