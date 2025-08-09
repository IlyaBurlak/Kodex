const inquirer = require('inquirer');
const { saveConfig } = require('../configManager');

module.exports = function(dependencies) {
    return async function showEmailConfig(config) {
        const answers = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'validateFormat',
                message: 'Проверять формат email?',
                default: config.email.validateFormat
            },
            {
                type: 'input',
                name: 'allowedDomains',
                message: 'Разрешенные домены (через запятую):',
                default: config.email.allowedDomains.join(', '),
                filter: input => input.split(',').map(d => d.trim()).filter(Boolean)
            }
        ]);

        config.email = { ...config.email, ...answers };
        saveConfig(config);
        console.log('Настройки email обновлены!');
        await dependencies.showMainMenu();
    };
};