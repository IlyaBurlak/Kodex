const { getConfig } = require('../CLI/configManager');

const isEmailValid = (email) => {
    const config = getConfig().email;

    if (config.validateFormat) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) return false;
    }

    if (config.allowedDomains.length > 0) {
        const domain = email.split('@')[1];
        if (!config.allowedDomains.includes(domain)) return false;
    }

    return true;
};

const isPasswordValid = (password) => {
    const config = getConfig().password;
    const lowerPassword = password.toLowerCase();

    if (password.length < config.minLength) return false;

    if (config.forbiddenPatterns.some(pattern =>
        lowerPassword.includes(pattern.toLowerCase()))) {
        return false;
    }

    if (config.maxRepeatingChars > 0) {
        const repeatingRegex = new RegExp(`(.)\\1{${config.maxRepeatingChars},}`);
        if (repeatingRegex.test(password)) return false;
    }

    if (config.maxSequentialChars > 0) {
        const sequentialChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i <= sequentialChars.length - config.maxSequentialChars; i++) {
            const sequence = sequentialChars.substr(i, config.maxSequentialChars);
            if (lowerPassword.includes(sequence)) return false;
            if (lowerPassword.includes([...sequence].reverse().join(''))) return false;
        }
    }

    if (config.requireUpper && !/[A-Z]/.test(password)) return false;
    if (config.requireLower && !/[a-z]/.test(password)) return false;
    if (config.requireNumber && !/\d/.test(password)) return false;
    if (config.requireSpecial && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;

    return true;
};

module.exports = { isEmailValid, isPasswordValid };