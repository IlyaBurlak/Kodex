const inquirer = require('inquirer');
const { getConfig } = require('../configManager');

module.exports = function createMainMenu(menuHandlers) {
    return async function showMainMenu() {
        const config = getConfig();

        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Настройки валидации:',
            choices: [
                { name: 'Настройки email', value: 'email' },
                { name: 'Настройки пароля', value: 'password' },
                { name: 'Генерация данных', value: 'generate' },
                { name: 'Тест текущих настроек', value: 'test' },
                { name: 'Сбросить настройки', value: 'reset' },
                { name: 'Сохранить и выйти', value: 'save' }
            ]
        });

        switch (action) {
            case 'email':
                await menuHandlers.showEmailConfig(config);
                break;
            case 'password':
                await menuHandlers.showPasswordConfig(config);
                break;
            case 'generate':
                await menuHandlers.showGeneratorMenu();
                break;
            case 'test':
                await menuHandlers.testConfiguration();
                break;
            case 'reset':
                await menuHandlers.resetConfiguration();
                break;
            case 'save':
                menuHandlers.saveConfiguration();
                break;
            default:
                await showMainMenu();
        }
    };
};