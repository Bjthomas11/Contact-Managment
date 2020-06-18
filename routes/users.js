// registered user routes
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route  POST api/users
// @desc  Register a user
// @access  Public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ message: "User already exist" });
      }
      user = new User({
        name: name,
        email: email,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);

      //   give hash version of password
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("Added");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// export router
module.exports = router;
