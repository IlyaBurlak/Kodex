const { describe, test, expect } = require('@jest/globals');
const { isEmailValid, isPasswordValid } = require('../src/utils/validators');

jest.mock('../src/CLI/configManager', () => {
    return {
        getConfig: jest.fn(() => ({
            email: {
                validateFormat: true,
                allowedDomains: ['test.com']
            },
            password: {
                minLength: 8,
                requireUpper: true,
                requireLower: true,
                requireNumber: true,
                requireSpecial: true,
                forbiddenPatterns: ['password'],
                maxRepeatingChars: 3,
                maxSequentialChars: 3
            }
        }))
    };
});

describe('Email Validation', () => {
    test('Valid email with allowed domain', () => {
        expect(isEmailValid('user@test.com')).toBe(true);
    });

    test('Invalid email format', () => {
        expect(isEmailValid('user@.com')).toBe(false);
    });

    test('Email with not allowed domain', () => {
        expect(isEmailValid('user@gmail.com')).toBe(false);
    });
});

describe('Password Validation', () => {


    test('Too short password', () => {
        expect(isPasswordValid('Short1!')).toBe(false);
    });

    test('Password without uppercase', () => {
        expect(isPasswordValid('nopass123!')).toBe(false);
    });
});