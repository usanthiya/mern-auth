import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import { NODE_ENV, SECURITY_SECRET, SENDER_EMAIL } from "../setup/config/env.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing required fields" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, SECURITY_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days in milli sec
    });
    
    //Sending welcome email
    const mailOptions = {
      from : SENDER_EMAIL,
      to : email,
      subject : 'Welcome to AuthHub',
      text: `Welcome to AuthHub. Your account has been successfully created with email: ${email}`
    }
    await transporter.sendMail(mailOptions);

    return res.json({success: true})
  } catch (err) {
    console.log("Error registering user: ", err);
    return res.json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password is required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, SECURITY_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({success: true})

  } catch (err) {
    console.log("Error logging user: ", err);
    return res.json({ success: false, message: err.message });
  }
};

export const logout = async (req, res) => {
   try{
      res.clearCookie('token', {
         httpOnly: true,
         secure: NODE_ENV === "production",
         sameSite: NODE_ENV === "production" ? "none" : "strict",
      })
      return res.json({success: true, message: 'Logged out' })
   }catch(err){
      return res.json({success: false, message: err.message })
   }
}