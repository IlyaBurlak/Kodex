const fs = require('fs');
const path = require('path');
const { getConfig, saveConfig, resetConfig } = require('../src/CLI/configManager');
const { describe, test, expect, beforeEach, afterEach } = require('@jest/globals');

jest.mock('fs');
jest.mock('path');

describe('Config Manager', () => {
    const configPath = '/mock/config/path.json';
    let originalConsoleError;

    beforeEach(() => {
        originalConsoleError = console.error;
        console.error = jest.fn();

        path.join.mockReturnValue(configPath);
        jest.clearAllMocks();
    });

    afterEach(() => {
        console.error = originalConsoleError;
    });

    test('Loads default config when no file exists', () => {
        fs.existsSync.mockReturnValue(false);
        const config = getConfig();

        expect(config.email).toEqual({
            validateFormat: true,
            allowedDomains: []
        });
        expect(config.password).toEqual({
            minLength: 8,
            requireUpper: true,
            requireLower: true,
            requireNumber: true,
            requireSpecial: true,
            forbiddenPatterns: ["password", "qwerty", "123456", "abc123"],
            maxRepeatingChars: 3,
            maxSequentialChars: 3
        });
    });

    test('Loads existing config correctly', () => {
        const mockConfig = {
            email: { allowedDomains: ['custom.com'] },
            password: { minLength: 12 }
        };

        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

        const config = getConfig();
        expect(config.email.allowedDomains).toEqual(['custom.com']);
        expect(config.password.minLength).toBe(12);
    });

    test('Handles invalid JSON config', () => {
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue('invalid json');

        const config = getConfig();
        expect(config.email).toBeDefined();
        expect(console.error).toHaveBeenCalled();
    });


    test('Resets to default config', () => {
        const defaultConfig = {
            email: {
                validateFormat: true,
                allowedDomains: []
            },
            password: {
                minLength: 8,
                requireUpper: true,
                requireLower: true,
                requireNumber: true,
                requireSpecial: true,
                forbiddenPatterns: ["password", "qwerty", "123456", "abc123"],
                maxRepeatingChars: 3,
                maxSequentialChars: 3
            }
        };

        resetConfig();

        const writtenData = fs.writeFileSync.mock.calls[0][1];
        expect(JSON.parse(writtenData)).toEqual(defaultConfig);
    });

    test('Handles write errors', () => {
        fs.writeFileSync.mockImplementation(() => {
            throw new Error('Write failed');
        });

        saveConfig({});
        expect(console.error).toHaveBeenCalledWith(
            'Config saving error:',
            expect.any(Error)
        );
    });
});