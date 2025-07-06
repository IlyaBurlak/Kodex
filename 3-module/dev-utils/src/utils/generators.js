const { getConfig } = require('../CLI/configManager');

const randomString = (length = 10, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

const generateTestEmail = () => {
    const config = getConfig().email;
    const domain = config.allowedDomains.length > 0
        ? config.allowedDomains[Math.floor(Math.random() * config.allowedDomains.length)]
        : 'example.com';

    return `test-${randomString(8)}@${domain}`;
};

const generateTestPassword = () => {
    const config = getConfig().password;
    const minLength = Math.max(config.minLength, 8);

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=';

    let password = '';

    if (config.requireUpper) password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    if (config.requireLower) password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    if (config.requireNumber) password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (config.requireSpecial) password += symbols.charAt(Math.floor(Math.random() * symbols.length));

    const allChars = uppercase + lowercase + numbers + symbols;
    while (password.length < minLength) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password.split('').sort(() => 0.5 - Math.random()).join('');
};

const generateTestLogin = () => {
    return `user_${randomString(8)}`;
};

const generateMultipleEmails = (count = 1) => {
    return Array.from({length: count}, () => generateTestEmail());
};

const generateMultiplePasswords = (count = 1) => {
    return Array.from({length: count}, () => generateTestPassword());
};

const generateMultipleSets = (count = 1) => {
    return Array.from({length: count}, () => ({
        email: generateTestEmail(),
        password: generateTestPassword()
    }));
};

module.exports = {
    generateTestEmail,
    generateTestPassword,
    generateTestLogin,
    generateMultipleEmails,
    generateMultiplePasswords,
    generateMultipleSets
};