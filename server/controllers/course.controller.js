import * as courseService from "../services/course.service.js";

// Create Course
export const createCourse = async (req, res) => {
    try {
        const { title, description, category, price, capacity } = req.body;
        const instructorId = req.userId; // From authMiddleware

        if (!title || !description || !category || price === undefined || !capacity) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const newCourse = await courseService.createCourse({
            title,
            description,
            category,
            price,
            capacity,
            instructor: instructorId
        });

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course: newCourse
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Courses
export const getAllCourses = async (req, res) => {
    try {
        const { category, instructor } = req.query;
        const filters = {};
        if (category) filters.category = category;
        if (instructor) filters.instructor = instructor;

        const courses = await courseService.getAllCourses(filters);

        res.status(200).json({
            success: true,
            count: courses.length,
            courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Course by ID
export const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courseService.getCourse(id);

        res.status(200).json({
            success: true,
            course
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Update Course
export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const userId = req.userId;

        // Check if user is the instructor of the course or an admin
        const course = await courseService.getCourse(id);
        if (course.instructor._id.toString() !== userId && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this course'
            });
        }

        const updatedCourse = await courseService.updateCourse(id, updateData);

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            course: updatedCourse
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Course
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const course = await courseService.getCourse(id);
        if (course.instructor._id.toString() !== userId && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this course'
            });
        }

        const result = await courseService.deleteCourse(id);

        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

// Enroll in Course
export const enrollInCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = req.userId;

        const updatedCourse = await courseService.enrollStudent(id, studentId);

        res.status(200).json({
            success: true,
            message: 'Enrolled in course successfully',
            course: updatedCourse
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
