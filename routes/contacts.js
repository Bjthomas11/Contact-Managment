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
router.post(
  "/",
  [auth, check("name", "name is requried").not().isEmpty()],
  async (req, res) => {
    //   checking errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name: name,
        email: email,
        phone: phone,
        type: type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  PUT api/contacts/:id
// @desc  Update contact
// @access  Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // build contact object based on whats submitted
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    //   finds contact by id
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "contact not found" });
    }

    // make user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      {
        new: true,
      }
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  DELETE api/contacts/:id
// @desc  Delete contact
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //   finds contact by id
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "contact not found" });
    }

    // make user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// export router
module.exports = router;
