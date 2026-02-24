import Course from "../models/course.js";

// Create a new course
export const createCourse = async (courseData) => {
    try {
        const newCourse = new Course(courseData);
        await newCourse.save();
        return newCourse;
    } catch (error) {
        throw new Error(`Error creating course: ${error.message}`);
    }
};

// Get course by ID
export const getCourse = async (courseId) => {
    try {
        const course = await Course.findById(courseId).populate('instructor', 'name email').populate('studentsEnrolled', 'name email');
        if (!course) {
            throw new Error('Course not found');
        }
        return course;
    } catch (error) {
        throw new Error(`Error fetching course: ${error.message}`);
    }
};

// Get all courses
export const getAllCourses = async (filters = {}) => {
    try {
        const courses = await Course.find(filters).populate('instructor', 'name email');
        return courses;
    } catch (error) {
        throw new Error(`Error fetching courses: ${error.message}`);
    }
};

// Update course
export const updateCourse = async (courseId, updateData) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            updateData,
            { new: true, runValidators: true }
        ).populate('instructor', 'name email');

        if (!updatedCourse) {
            throw new Error('Course not found');
        }

        return updatedCourse;
    } catch (error) {
        throw new Error(`Error updating course: ${error.message}`);
    }
};

// Delete course
export const deleteCourse = async (courseId) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            throw new Error('Course not found');
        }
        return { message: 'Course deleted successfully', courseId };
    } catch (error) {
        throw new Error(`Error deleting course: ${error.message}`);
    }
};

// Enroll student in course
export const enrollStudent = async (courseId, studentId) => {
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }

        if (course.studentsEnrolled.includes(studentId)) {
            throw new Error('Student already enrolled in this course');
        }

        if (course.studentsEnrolled.length >= course.capacity) {
            throw new Error('Course is at full capacity');
        }

        course.studentsEnrolled.push(studentId);
        await course.save();
        return course;
    } catch (error) {
        throw new Error(`Error enrolling student: ${error.message}`);
    }
};
