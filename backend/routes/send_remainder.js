const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");
const { Adm_User, validateUser } = require("../models/user");
const sendEmail = require("../utils/email");
const Adm_Faculty = require("../models/faculty");

const generateVerificationToken = (userId) => {
  const payload = { userId };
  return jwt.sign(payload, config.get("jwtPrivatekey"), { expiresIn: "0.25h" });
};

// middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivatekey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};

router.get("/", (req, res) => {
  res.send("Sending reminder!!");
});

router.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
  ];
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    // Retrieve the email addresses from the Adm_Faculty table
    const facultyEmails = await Adm_Faculty.findAll({
      attributes: ["adm_faculty_email"],
    });
    // res.send(facultyEmails)
    // Loop through the email addresses and send an email to each address
    for (let i = 0; i < facultyEmails.length; i++) {
      const email = facultyEmails[i].dataValues.adm_faculty_email;
      const token = generateVerificationToken(email);

      const message = "Open the link to accept or Reject AIP";
      const subject = "AIP Request ";
      const verificationLink = `http://localhost:1000/api/send_remainder/${token}`;
      // const verificationLink = `www.google.com`;
      console.log(verificationLink)
      await sendEmail(
        email,
        subject,
        "Lalith",
        message,
        verificationLink
      );
    }
    res.send("Emails Sent!!")

    console.log("All emails have been sent.");
  } catch (error) {
    console.error(error);
  }
})

// Route to display AIP accept screen
router.get("/:token", (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, config.get("jwtPrivatekey"));
    const email = decoded.userId;
    // res.redirect(`http://localhost:3000/${email}`);
        // set a cookie with the email
        res.cookie('email', email);

        // redirect to the AIP accept screen
        res.redirect(302, `http://localhost:3000`);
        
    // res.redirect(`http://localhost:3000`, { email });
    // res.redirect(302, `http://localhost:3000/?email=${email}`);
    // res.render('faculty-side/aip-accept-screen.jsx', { email });
  } catch (err) {
    console.error(err);
    res.status(401).json({
      message: "Invalid token.",
    });
  }
});



router.get("/fac", async (req, res) => {
  try {
    Adm_Faculty.findAll()
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        console.error(error); // Print the error to the console

      });
  } catch (error) {

  }
})



module.exports = router;
