import express from 'express';
import * as courseController from '../controllers/course.controller.js';
import { authMiddleware, instructorMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourse);

// Protected routes (require student/instructor/admin login)
router.post('/:id/enroll', authMiddleware, courseController.enrollInCourse);

// Instructor routes (require instructor/admin login)
router.post('/create', instructorMiddleware, courseController.createCourse);
router.put('/:id', instructorMiddleware, courseController.updateCourse);
router.delete('/:id', instructorMiddleware, courseController.deleteCourse);

export default router;
