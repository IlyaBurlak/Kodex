#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const cliPath = path.join(__dirname, '../CLI/cli.js');

try {
    fs.chmodSync(cliPath, 0o755);
    console.log('CLI настроен успешно. Теперь используйте: settings');
} catch (err) {
    console.error('Ошибка настройки CLI:', err.message);
    console.log('Вы можете запустить вручную: node node_modules/ilyaburlak_dev-kit/src/CLI/cli.js');
}