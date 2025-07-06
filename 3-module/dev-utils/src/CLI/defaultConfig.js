module.exports = {
    email: {
        allowedDomains: [],
        validateFormat: true
    },
    password: {
        minLength: 8,
        requireSpecial: true,
        requireNumber: true,
        requireUpper: true,
        requireLower: true,
        forbiddenPatterns: ["password", "qwerty", "123456", "abc123"],
        maxRepeatingChars: 3,
        maxSequentialChars: 3
    }
};