import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import { NODE_ENV, SECURITY_SECRET, SENDER_EMAIL } from "../setup/config/env.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";

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
    res.json({ success: false, message: err.message });
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
    res.json({ success: false, message: err.message });
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
      res.json({success: false, message: err.message })
   }
}

// Send verification otp to email
export const sendVerifyOtp = async(req, res) =>{

  try{
    const userId = req.user.id;
  
    const user = await userModel.findById(userId);

    if(user.isAccountVerified){
      return res.json({success: false, message: 'Account is already verified'});
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 1 day i.e 24 hrs

    await user.save();

    const mailOption = {
      from: SENDER_EMAIL,
      to: user.email,
      subject: 'Account verification OTP',
      // text: `Your otp is ${otp}. Verify your account using this otp.`
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
    }

    await transporter.sendMail(mailOption);

    return res.json({success: true, message: 'Verfication otp sent on Email'});

  }catch(err){
    res.json({success: false, message: err.message});
  }
}

//Verify Email using otp
export const verifyEmail = async(req, res) => {
  const userId = req.user.id;
  const { otp } = req.body;

  if(!userId || !otp){
    return res.json({success: false, message: 'Missing details'})
  }

  try{
    const user = await userModel.findById(userId);

    if(!user){
      return res.json({success: false, message: 'User not Found'})
    }
    if(user.verifyOtp == '' || user.verifyOtp != otp){
      return res.json({success: false, message: 'Invalid OTP'});
    }
    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({success: false, message: 'OTP is Expired'});
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({success: true, message: 'Email verified successfully'});

  }catch(err){
    res.json({success: false, message: err.message});
  }
}

//Check if User is authenticated
export const isAuthenticated = async (req, res) => {
  try{
    return res.json({success: true})
  }catch(err){
    res.josn({success: false, message: err.message});
  }
}

//Send Reset Password OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if(!email){
    return res.json({succcess: false, message: 'Email is required'});
  }
  try{
    const user = await userModel.findOne({email});

    if(!user){
      return res.json({success: false, message: 'User not found'})
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; //15 mins

    await user.save();

    const mailOptions = {
      from: SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      // text: `Your OTP for resetting your password is ${otp}. Use this OTP to reset your password`
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
    }

    await transporter.sendMail(mailOptions);

    return res.json({success: true, message: 'OTP sent to your email'})
  }catch(err){
    return res.json({success: false, message: err.message});
  }
}

//Reset User Password
export const resetPassword = async(req, res) => {
  const { email, otp, newPassword } = req.body;

  if(!email || !otp || !newPassword) {
    return res.json({success: false, message: 'Email, OTP, Password fields are mandatory'});
  }
  try{
    const user = await userModel.findOne({email});

    if(!user){
      return res.json({success: false, message: 'User not found'});
    }

    if(user.resetOtp === '' || user.resetOtp != otp){
      return res.json({success: false, message: 'Invalid OTP'});
    }

    if(user.resetOtpExpireAt < Date.now()){
      return res.json({success: false, message: 'OTP is Expired'});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({success: true, message: 'Password has been reset successfully'});

  }catch(err){
    return res.json({success: false, message: err.message});
  }
}