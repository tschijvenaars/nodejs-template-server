import { Router } from "express";
import models from "../models";

const router = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already in use
    const userExists = await models.User.findOne({
      username: username,
    }).then((user) => {
      return user;
    });

    if (userExists) {
      res.status(401).json({ message: "Username already in use" });
      return;
    }

    // Define salt rounds
    const saltRounds = 10;

    // Hash password
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }

      // Create a new user
      const user = new models.User({
        username,
        password: hash,
      });

      // Save user to database
      user.save().then(() => {
        res.json({ message: "User created successfully", user });
      });
    });
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Extract username and password from the req.body object
    const { username, password } = req.body;

    const user = await models.User.findOne({
      username: username,
    }).then((user) => {
      return user;
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Username" });
    }

    // Compare passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        return;
      }

      console.log(err);
      return res.status(401).json({ message: "Invalid Credentials" });
    });

    jwt.sign({ username }, process.env.SECRET_KEY, (err, token) => {
      if (!err) {
        return res.json({ token });
      } else {
        console.log(err);
        return res.status(401).json({ message: "Token error" });
      }
    });
  } catch (error) {
    res.status(401).send(err.message);
  }
});

function handleError(err) {
  console.log(err);
}

export default router;
