

const {
  checkConfigVariables,
  sequelizeSync,
} = require("./utils/utility_functions");
const express = require("express");
const signup = require("./routes/signup");
const verify_user = require("./routes/verify_user");
const signin = require("./routes/signin");
const users = require("./routes/users");
const reset_password = require("./routes/reset_password");
const populateRouter = require("./routes/populate_router");
const sendReminderRoutes = require("./routes/send_remainder");
const app = express();
const config = require("config");
const aip_data = require("./routes/aipdatadb");
const get_aip_data = require("./routes/get_aipdata");
const get_fac_data = require("./routes/grt_facultydata");
const add_notcom = require("./routes/add_notcom");
const update_notcom = require("./routes/update_notcom");
const get_notcom = require("./routes/get_notcom");
const update_facdata = require("./routes/update_facultydata");
const update_facavail = require("./routes/update_facavail");
const panel_requirement = require("./routes/panel_requirement");



const get_facdata = require("./routes/get_fac_data")
const get_allocation_data = require("./routes/get_allocation_data")
const get_fac_selection_data = require("./routes/get_fac_data_for_selection")
const update_fac_selection_data = require("./routes/update_selected_fac")
const add_selected_fac_data = require("./routes/add_selected_fac");
const { getAreaName } = require("./controllers/area");


// Add this code to enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});



checkConfigVariables();
sequelizeSync(),


// Route manatement

app.use(express.json());

app.use("/api/signup", signup);
app.use("/api/signin", signin);
app.use("/api/verify_user", verify_user);
app.use("/api/users/me", users);
app.use("/api/reset_password", reset_password);
// app.use("/api/send_remainder", send_remainder);
// Send Reminder routes
app.use("/api/send_remainder", sendReminderRoutes);

app.use("/api/populate", populateRouter);
app.use("/api/aipdatadb", aip_data);
app.use("/api/getaipdata", get_aip_data);
app.use("/api/getfacdata", get_fac_data);
app.use("/api/addnotcom", add_notcom);
app.use("/api/updatenotcom", update_notcom);
app.use("/api/getnotcom", get_notcom);
app.use("/api/updatefacdata", update_facdata);
app.use("/api/updatefacavail", update_facavail);


app.use("/api/signup", signup);
app.use("/api/signin", signin);
app.use("/api/verify_user", verify_user);
app.use("/api/users/me", users);
app.use("/api/reset_password", reset_password);
// app.use("/api/send_remainder", send_remainder);
// Send Reminder routes
app.use("/api/send_remainder", sendReminderRoutes);


app.use('/api/populate', populateRouter);
app.use("/api/aipdatadb", aip_data);
app.use("/api/getaipdata", get_aip_data);
app.use("/api/getfacdata", get_fac_data);
app.use("/api/addnotcom", add_notcom);
app.use("/api/updatenotcom", update_notcom);
app.use("/api/getnotcom", get_notcom);
app.use("/api/updatefacdata", update_facdata);
app.use("/api/updatefacavail", update_facavail);
app.use("/api/get-facdata", get_facdata);
app.use("/api/get-allocationdata", get_allocation_data);
app.use("/api/get-fac-selection-data", get_fac_selection_data);
app.use("/api/update-fac-selection-data", update_fac_selection_data);
app.use("/api/add_selected-data", add_selected_fac_data);

app.get("/api/", (req, res) => {
  res.send("Hellow");
});
app.get("/api/", (req, res) => {
  res.send("Hellow");
});

const port = config.get("server_PORT") || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
