const inquirer = require('inquirer');
const { saveConfig } = require('../configManager');

module.exports = function(dependencies) {
    return async function showPasswordConfig(config) {
        const answers = await inquirer.prompt([
            {
                type: 'number',
                name: 'minLength',
                message: 'Минимальная длина пароля:',
                default: config.password.minLength,
                validate: input => input > 4 || 'Длина должна быть больше 4 символов'
            },
            {
                type: 'confirm',
                name: 'requireUpper',
                message: 'Требовать заглавные буквы?',
                default: config.password.requireUpper
            },
            {
                type: 'confirm',
                name: 'requireLower',
                message: 'Требовать строчные буквы?',
                default: config.password.requireLower
            },
            {
                type: 'confirm',
                name: 'requireNumber',
                message: 'Требовать цифры?',
                default: config.password.requireNumber
            },
            {
                type: 'confirm',
                name: 'requireSpecial',
                message: 'Требовать спецсимволы?',
                default: config.password.requireSpecial
            },
            {
                type: 'number',
                name: 'maxRepeatingChars',
                message: 'Максимальное количество повторяющихся символов подряд:',
                default: config.password.maxRepeatingChars,
                validate: input => input >= 0 || 'Значение должно быть 0 или больше'
            },
            {
                type: 'number',
                name: 'maxSequentialChars',
                message: 'Максимальное количество последовательных символов (abc, 123):',
                default: config.password.maxSequentialChars,
                validate: input => input >= 0 || 'Значение должно быть 0 или больше'
            },
            {
                type: 'input',
                name: 'forbiddenPatterns',
                message: 'Запрещенные паттерны (через запятую):',
                default: config.password.forbiddenPatterns.join(', '),
                filter: input => input.split(',').map(p => p.trim()).filter(Boolean)
            }
        ]);

        config.password = { ...config.password, ...answers };
        saveConfig(config);
        console.log('Настройки пароля обновлены!');
        await dependencies.showMainMenu();
    };
};