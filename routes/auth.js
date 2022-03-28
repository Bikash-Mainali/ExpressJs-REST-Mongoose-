
"use script";
const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();
const authRouter = express.Router();
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { ACCESSS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env
const authenticateToken = require("../middleware/auth")

// Getting all
authRouter.get('/', async function (req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Login and token generate
authRouter.post("/login", async (req, res) => {
  try {
    // Authenticate User
    const { email, password } = req.body
    const userCredential = {
      email: email,
      password: password
    }
    const dbCredential = await User.findOne({email: email})

    /**
     * to generate token secret
     * type require('crypto')).randomBytes(64).toString('hex') in console and copy and put it into .env file
     */
    if (dbCredential && await bcrypt.compare(userCredential.password, dbCredential.password)) {
      const accessToken = jwt.sign(
        { userCredential },
        ACCESSS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ accessToken: accessToken })
    }
    else {
      res.status(400).send("Invalid Credentials");
    }
  }
  catch (err) {
    console.log(err);
  }
})


authRouter.post("/register", async (req, res) => {
  try {
    // Get user input
    const { firstName, secondName, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstName && secondName && email)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    const userForToken = {
      firstName: firstName,
      secondName: secondName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    }

    // Create token
    const accessToken = jwt.sign(
      { userForToken, email },
      ACCESSS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
        // Create user in our database
        const user = await User.create({
          firstName: firstName,
          secondName: secondName,
          email: email.toLowerCase(),
          password: encryptedPassword,
          token: accessToken
        });
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});




module.exports = authRouter




