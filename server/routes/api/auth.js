const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const config = require("config");

//Service imports
const AuthService = require("../../services/AuthService");
const authService = new AuthService();
const UserService = require("../../services/UserService");
const userService = new UserService();

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await userService.getUser(req);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post("/", async (req, res) => {
  try {
    let payload = await authService.login(req.body);
    if (payload.id === undefined) {
      console.log("payload is undefined");
      res.status(500).json({ msg: "Invalid Credentials" });
    }

    console.log("shold");

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log("err", err.message);
    return res.status(500).send("Server error");
  }
});

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.post("/logout", auth, async (req, res) => {
  try {
    const { activeUserId } = req.body;

    let userHistoryFields = {
      description: "User signed out",
      updatedBy: null,
      user: activeUserId,
      date: new Date(),
    };
    await userHistoryService.addUserHistory(userHistoryFields);
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/register
//@desc     Register a New User from the Registration page. May be deprecated.
//@access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await authService.register(req.body);
      return res.json({ result });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

//@route    POST api/auth/confirm/token:
//@desc     Confirm user's email
//@access   Private
router.post("/confirm/", async (req, res) => {
  try {
    let payload = await authService.confirmAccount(req.body);
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log("err", err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
