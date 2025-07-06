const { describe, test, expect, beforeEach } = require('@jest/globals');
const fs = require('fs');
const path = require('path');
const { getConfig, saveConfig, resetConfig } = require('../src/CLI/configManager');

jest.mock('fs');
jest.mock('path', () => ({
    join: jest.fn((...args) => args.join('/')),
    cwd: jest.fn(() => 'mock/project/dir')
}));

describe('Config Manager', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Loads default config when file does not exist', () => {
        fs.existsSync.mockReturnValue(false);
        const config = getConfig();
        expect(config.email).toBeDefined();
        expect(config.password).toBeDefined();
    });

    test('Loads existing config file', () => {
        const mockConfig = { email: { allowedDomains: ['custom.com'] } };
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

        const config = getConfig();
        expect(config.email.allowedDomains).toEqual(['custom.com']);
    });

    test('Saves config correctly', () => {
        const testConfig = { email: { validateFormat: false } };
        saveConfig(testConfig);
        expect(fs.writeFileSync).toHaveBeenCalled();
    });

    test('Resets to default config', () => {
        resetConfig();
        expect(fs.writeFileSync).toHaveBeenCalled();
    });
});