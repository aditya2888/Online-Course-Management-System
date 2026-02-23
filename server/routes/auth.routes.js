import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-token', authController.verifyToken);

// Protected routes
router.post('/logout', authMiddleware, authController.logout);
router.get('/me', authMiddleware, authController.getCurrentUser);

export default router;
