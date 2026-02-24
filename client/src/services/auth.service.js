import api from './api';

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.success) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        if (response.data.success) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const logout = async () => {
    try {
        await api.post('/auth/logout');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    } catch (error) {
        console.error('Logout error:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    }
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
