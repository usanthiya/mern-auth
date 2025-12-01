import express from 'express';
const router = express.Router();
import { login, logout, register } from '../controllers/authController.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);

export default router;