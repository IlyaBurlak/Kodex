const { test, expect, describe, beforeEach } = require("@jest/globals");

const {
    generateTestEmail,
    generateTestPassword,
    generateTestLogin,
    generateMultipleEmails,
    generateMultiplePasswords,
    generateMultipleSets
} = require('../src/utils/generators');
const { getConfig } = require('../src/CLI/configManager');

jest.mock('../src/CLI/configManager');

describe('Generators', () => {
    beforeEach(() => {
        getConfig.mockReturnValue({
            email: { allowedDomains: ['test.com', 'example.org'] },
            password: {
                minLength: 10,
                requireUpper: true,
                requireLower: true,
                requireNumber: true,
                requireSpecial: true
            }
        });
    });

    test('Email generator uses random domains', () => {
        const emails = Array.from({ length: 20 }, () => generateTestEmail());
        const domains = emails.map(e => e.split('@')[1]);

        const uniqueDomains = [...new Set(domains)];
        expect(uniqueDomains).toEqual(expect.arrayContaining(['test.com', 'example.org']));

        emails.forEach(email => {
            expect(email).toMatch(/^test-[a-zA-Z0-9]{8}@(test\.com|example\.org)$/);
        });
    });

    test('Password meets all requirements', () => {
        const password = generateTestPassword();

        expect(password.length).toBeGreaterThanOrEqual(10);
        expect(password).toMatch(/[A-Z]/);
        expect(password).toMatch(/[a-z]/);
        expect(password).toMatch(/\d/);
        expect(password).toMatch(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
    });

    test('Login has correct format', () => {
        const login = generateTestLogin();
        expect(login).toMatch(/^user_[a-zA-Z0-9]{8}$/);
    });

    describe('Batch Generators', () => {
        test('Generate multiple emails', () => {
            const emails = generateMultipleEmails(5);
            expect(emails).toHaveLength(5);
            emails.forEach(email => {
                expect(email).toMatch(/@(test\.com|example\.org)$/);
            });
        });

        test('Generate multiple passwords', () => {
            const passwords = generateMultiplePasswords(3);
            expect(passwords).toHaveLength(3);
            passwords.forEach(password => {
                expect(password.length).toBeGreaterThanOrEqual(10);
            });
        });

        test('Generate credential sets', () => {
            const sets = generateMultipleSets(2);
            expect(sets).toHaveLength(2);
            sets.forEach(({ email, password }) => {
                expect(email).toMatch(/^test-[a-zA-Z0-9]{8}@(test\.com|example\.org)$/);
                expect(password.length).toBeGreaterThanOrEqual(10);
            });
        });

        test('Handle zero count', () => {
            expect(generateMultipleEmails(0)).toEqual([]);
            expect(generateMultiplePasswords(0)).toEqual([]);
            expect(generateMultipleSets(0)).toEqual([]);
        });
    });

    test('Password generator handles minimal config', () => {
        getConfig.mockReturnValue({
            password: {
                minLength: 4,
                requireUpper: false,
                requireLower: false,
                requireNumber: false,
                requireSpecial: false
            }
        });

        const password = generateTestPassword();
        expect(password.length).toBeGreaterThanOrEqual(4);
    });

    test('Email falls back to example.com', () => {
        getConfig.mockReturnValue({ email: { allowedDomains: [] } });
        const email = generateTestEmail();
        expect(email).toMatch(/@example\.com$/);
    });
});