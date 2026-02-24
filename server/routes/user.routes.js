import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/create', userController.createUser);
router.get('/email/:email', userController.getUserByEmail);

// Protected routes (require authentication)
router.get('/:id', authMiddleware, userController.getUser);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.post('/:id/change-password', authMiddleware, userController.changePassword);

// Admin routes (require admin role check)
router.get('/', adminMiddleware, userController.getAllUsers);

export default router;
