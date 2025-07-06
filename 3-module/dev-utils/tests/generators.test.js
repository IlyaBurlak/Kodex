const { describe, test, expect } = require('@jest/globals');
const { generateTestEmail, generateTestPassword } = require('../src/utils/generators');

jest.mock('../src/CLI/configManager', () => ({
    getConfig: jest.fn(() => ({
        email: {
            allowedDomains: ['test.com']
        },
        password: {
            minLength: 8,
            requireUpper: true,
            requireLower: true,
            requireNumber: true,
            requireSpecial: true
        }
    }))
}));

describe('Generators', () => {
    test('Generates email with allowed domain', () => {
        const email = generateTestEmail();
        expect(email).toMatch(/@test.com$/);
    });

    test('Generates valid password with required characters', () => {
        const password = generateTestPassword();

        expect(password.length).toBeGreaterThanOrEqual(8);
        expect(password).toMatch(/[A-Z]/);
        expect(password).toMatch(/[a-z]/);
        expect(password).toMatch(/[0-9]/);
        expect(password).toMatch(/[!@#$%^&*()]/);
    });
});