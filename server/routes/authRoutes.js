import express from 'express';
const router = express.Router();
import { login, logout, register, sendVerifyOtp, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/send-verify-otp').post(userAuth, sendVerifyOtp);
router.route('/verify-account').post(userAuth, verifyEmail);

export default router;