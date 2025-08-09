const inquirer = require('inquirer');
const { getConfig } = require('../configManager');
const { generateTestEmail, generateTestPassword } = require('../../utils/generators');
const { isEmailValid, isPasswordValid } = require('../../utils/validators');

module.exports = function(dependencies) {
    return async function testConfiguration() {
        const config = getConfig();

        console.log('\nТекущие настройки:', JSON.stringify(config, null, 2));
        console.log('\nГенерация тестовых данных:\nEmail:', generateTestEmail(), '\nПароль:', generateTestPassword());

        const inputs = await inquirer.prompt([
            {
                type: 'input',
                name: 'email',
                message: 'Введите email для проверки:'
            },
            {
                type: 'password',
                name: 'password',
                message: 'Введите пароль для проверки:'
            }
        ]);

        console.log('Email валиден:', isEmailValid(inputs.email));
        console.log('Пароль валиден:', isPasswordValid(inputs.password));

        await dependencies.showMainMenu();
    };
};