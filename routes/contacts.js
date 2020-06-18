// crud functionality routes
// registered user routes
const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth.js");
const Contact = require("../models/Contact");

const router = express.Router();

// @route  GET api/contacts
// @desc   Get all users contacts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/contacts
// @desc  Add a contact
// @access  Private
router.post("/", (req, res) => {
  res.send("Adds a contact");
});

// @route  PUT api/contacts/:id
// @desc  Update contact
// @access  Private
router.put("/:id", (req, res) => {
  res.send("Updates a contact");
});

// @route  DELETE api/contacts/:id
// @desc  Delete contact
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete a contact");
});

// export router
module.exports = router;
