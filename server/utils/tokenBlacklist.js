// Simple in-memory token blacklist
// In production, use Redis for better performance and scalability
const tokenBlacklist = new Set();

export const addToBlacklist = (token) => {
    tokenBlacklist.add(token);
};

export const isBlacklisted = (token) => {
    return tokenBlacklist.has(token);
};

export const clearBlacklist = () => {
    tokenBlacklist.clear();
};

// Optional: Clear expired tokens periodically
export const cleanupExpiredTokens = () => {
    // This is a simple implementation
    // In production, you would implement proper token expiration cleanup
    if (tokenBlacklist.size > 10000) {
        tokenBlacklist.clear();
    }
};

// Run cleanup every hour
setInterval(cleanupExpiredTokens, 3600000);
