import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Usermodel.js";
import fs from "fs";

//register
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      file,
      friends,
      location,
      occupation,
    } = req.body;

    // const orgNameArr = originalname.split(".");
    // const extension = orgNameArr[orgNameArr.length - 1];
    // const newPath = path + "." + extension;
    // fs.renameSync(path, newPath);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const userCreate = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: file,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const saveUser = await userCreate.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        delete user.password;
        res.status(200).json({ token, user });
      } else {
        res.status(400).json({ msg: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
