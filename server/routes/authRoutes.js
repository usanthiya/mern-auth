import express from 'express';
const router = express.Router();
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/send-verify-otp').post(userAuth, sendVerifyOtp);
router.route('/verify-account').post(userAuth, verifyEmail);
router.route('/is-auth').get(userAuth, isAuthenticated);
router.route('/send-reset-otp').post(sendResetOtp);
router.route('/reset-password').post(resetPassword);

export default router;