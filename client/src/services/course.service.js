import api from './api';

export const getAllCourses = async (params = {}) => {
    try {
        const response = await api.get('/courses', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getCourse = async (id) => {
    try {
        const response = await api.get(`/courses/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const createCourse = async (courseData) => {
    try {
        const response = await api.post('/courses/create', courseData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateCourse = async (id, courseData) => {
    try {
        const response = await api.put(`/courses/${id}`, courseData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteCourse = async (id) => {
    try {
        const response = await api.delete(`/courses/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const enrollInCourse = async (id) => {
    try {
        const response = await api.post(`/courses/${id}/enroll`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
