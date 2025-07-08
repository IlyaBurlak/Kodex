const { isEmailValid, isPasswordValid } = require('../src/utils/validators');
const { getConfig } = require('../src/CLI/configManager');

jest.mock('../src/CLI/configManager');

describe('Email Validation', () => {
    const testCases = [
        { email: 'valid@test.com', expected: true, desc: 'valid email' },
        { email: 'invalid-format', expected: false, desc: 'invalid format' },
        { email: 'user@.com', expected: false, desc: 'missing domain' },
        { email: '@test.com', expected: false, desc: 'missing local part' },
        { email: 'user@gmail.com', expected: false, desc: 'unauthorized domain' },
        { email: 'user@example.org', expected: true, desc: 'allowed domain' },
        { email: 'user@any.org', config: { allowedDomains: [] }, expected: true, desc: 'empty allowed domains' },
        { email: 'test+alias@test.com', expected: true, desc: 'email with plus alias' }
    ];

    testCases.forEach(({ email, expected, config, desc }) => {
        test(desc, () => {
            getConfig.mockReturnValue({
                email: {
                    validateFormat: true,
                    allowedDomains: ['test.com', 'example.org'],
                    ...config
                }
            });
            expect(isEmailValid(email)).toBe(expected);
        });
    });
});

describe('Password Validation', () => {
    const baseConfig = {
        minLength: 8,
        forbiddenPatterns: ['password', '123456'],
        maxRepeatingChars: 3,
        maxSequentialChars: 3,
        requireUpper: true,
        requireLower: true,
        requireNumber: true,
        requireSpecial: true
    };

    const testCases = [
        { password: 'Valid$P$as$s12$3', expected: true, desc: 'valid password' },
        { password: 'Short1!', expected: false, desc: 'too short' },
        { password: 'myPassword123!', expected: false, desc: 'contains forbidden pattern' },
        { password: 'safe123456!', expected: false, desc: 'contains numeric pattern' },
        { password: 'aaaBBBccc!1', expected: true, desc: 'repeating characters' },
        { password: 'aaBBcc!12', expected: true, desc: 'acceptable repeats' },
        { password: 'abcXYZ123!', expected: false, desc: 'sequential characters' },
        { password: 'cbaZYX321!', expected: false, desc: 'reverse sequential' },
        { password: 'missingupper1!', expected: false, desc: 'missing uppercase' },
        { password: 'MISSINGLOWER1!', expected: false, desc: 'missing lowercase' },
        { password: 'MissingNumbers!', expected: false, desc: 'missing numbers' },
        { password: 'MissingSpecial123', expected: false, desc: 'missing special' },
        {
            password: 'P@ssw0rd',
            config: { maxSequentialChars: 0 },
            expected: true,
            desc: 'sequential check disabled'
        },
        {
            password: 'Aa1!Aa1!',
            config: { minLength: 6 },
            expected: true,
            desc: 'custom min length'
        }
    ];

    testCases.forEach(({ password, expected, config = {}, desc }) => {
        test(desc, () => {
            getConfig.mockReturnValue({ password: { ...baseConfig, ...config } });
            expect(isPasswordValid(password)).toBe(expected);
        });
    });
});