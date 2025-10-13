import express from "express";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  if (username.length < 3) {
    return res
      .status(400)
      .json({ message: "Username must be at least 3 characters" });
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User with this email or username already exists" });
  }

  try {
    const newUser = new User({ username, email, password});
    await newUser.save();

    const token = generateToken(newUser._id);
    
    res
      .status(201)
      .json({ token, userId: newUser._id, username: newUser.username, profilePic: newUser.profilePic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

export default router;