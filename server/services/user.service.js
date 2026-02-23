import User from "../models/user.js"
import bcrypt from "bcrypt"

// Create a new user
export const createUser = async (userData) => {
    try {
        const { name, email, password, role } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'student'
        });

        await newUser.save();
        
        // Return user without password
        const userObj = newUser.toObject();
        delete userObj.password;
        return userObj;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

// Get user by ID
export const getUser = async (userId) => {
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};

// Get all users (optional, for admin purposes)
export const getAllUsers = async (filters = {}) => {
    try {
        const users = await User.find(filters).select('-password');
        return users;
    } catch (error) {
        throw new Error(`Error fetching users: ${error.message}`);
    }
};

// Update user
export const updateUser = async (userId, updateData) => {
    try {
        const { name, email, password, role } = updateData;
        
        // Build update object
        const updateObj = {};
        if (name) updateObj.name = name;
        if (email) updateObj.email = email;
        if (role) updateObj.role = role;
        
        // Hash password if provided
        if (password) {
            updateObj.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateObj,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

// Delete user
export const deleteUser = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            throw new Error('User not found');
        }

        return { message: 'User deleted successfully', userId };
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};

// Get user by email (for authentication)
export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};