const fs = require('fs');
const path = require('path');
const defaultConfig = require('./defaultConfig');

const CONFIG_DIR = path.join(__dirname, '../../config');
const CONFIG_PATH = path.join(CONFIG_DIR, 'validation-settings.json');

const ensureConfigDirExists = () => {
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }
};

const loadConfig = () => {
    try {
        ensureConfigDirExists();
        if (fs.existsSync(CONFIG_PATH)) {
            return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
        }
        return defaultConfig;
    } catch (error) {
        console.error('Config loading error:', error);
        return defaultConfig;
    }
};

const saveConfig = (config) => {
    try {
        ensureConfigDirExists();
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Config saving error:', error);
        return false;
    }
};

const getConfig = () => loadConfig();
const resetConfig = () => saveConfig(defaultConfig);

module.exports = {
    getConfig,
    saveConfig,
    resetConfig,
};