import jwt from 'jsonwebtoken';
import { isBlacklisted } from '../utils/tokenBlacklist.js';

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is required'
            });
        }

        // Check if token is blacklisted
        if (isBlacklisted(token)) {
            return res.status(401).json({
                success: false,
                message: 'Token has been revoked'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        req.userId = decoded.id;
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

export const adminMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is required'
            });
        }

        // Check if token is blacklisted
        if (isBlacklisted(token)) {
            return res.status(401).json({
                success: false,
                message: 'Token has been revoked'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        req.userId = decoded.id;
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};
