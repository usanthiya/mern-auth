import express from 'express';
import getUserData from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';
const router = express.Router();

router.route('/data').get(userAuth, getUserData);

export default router;