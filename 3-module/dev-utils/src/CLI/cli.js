#!/usr/bin/env node
const inquirer = require('inquirer');
const { getConfig, saveConfig, resetConfig } = require('./configManager');
const { generateTestEmail, generateTestPassword } = require('../utils/generators');
const validator = require('../utils/validators');

const showMenu = async () => {
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
            await configureEmail(config);
            break;

        case 'password':
            await configurePassword(config);
            break;

        case 'test':
            await testConfiguration();
            break;

        case 'reset':
            resetConfig();
            console.log('Настройки сброшены к значениям по умолчанию');
            await showMenu();
            break;

        case 'save':
            saveConfig(config);
            console.log('Настройки сохранены!');
            process.exit(0);
            break;

        case 'generate':
            await generateData();
            break;

        default:
            await showMenu();
    }
};

const generateData = async () => {
    const { dataType } = await inquirer.prompt({
        type: 'list',
        name: 'dataType',
        message: 'Выберите тип данных для генерации:',
        choices: [
            { name: 'Генерация паролей', value: 'passwords' },
            { name: 'Генерация email', value: 'emails' },
            { name: 'Генерация комплекта (email + пароль)', value: 'full' },
            { name: 'Назад в меню', value: 'back' }
        ]
    });

    if (dataType === 'back') {
        return await showMenu();
    }

    const { count } = await inquirer.prompt({
        type: 'number',
        name: 'count',
        message: 'Сколько элементов сгенерировать?',
        default: 1,
        validate: input => input > 0 || 'Число должно быть больше 0'
    });

    switch (dataType) {
        case 'passwords':
            generatePasswords(count);
            break;
        case 'emails':
            generateEmails(count);
            break;
        case 'full':
            generateFullSet(count);
            break;
    }

    await showMenu();
};

const generatePasswords = (count) => {
    console.log('\nСгенерированные пароли:');
    for (let i = 0; i < count; i++) {
        console.log(`${i+1}. ${generateTestPassword()}`);
    }
};

const generateEmails = (count) => {
    console.log('\nСгенерированные email:');
    for (let i = 0; i < count; i++) {
        console.log(`${i+1}. ${generateTestEmail()}`);
    }
};

const generateFullSet = (count) => {
    console.log('\nСгенерированные комплекты:');
    for (let i = 0; i < count; i++) {
        console.log(`${i+1}. Email: ${generateTestEmail()}`);
        console.log(`   Пароль: ${generateTestPassword()}\n`);
    }
};

const configureEmail = async (config) => {
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
    await showMenu();
};

const configurePassword = async (config) => {
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
    await showMenu();
};

const testConfiguration = async () => {
    const config = getConfig();

    console.log('\nТекущие настройки:');
    console.log(JSON.stringify(config, null, 2));

    console.log('\nГенерация тестовых данных:');
    console.log('Email:', generateTestEmail());
    console.log('Пароль:', generateTestPassword());

    const { email } = await inquirer.prompt({
        type: 'input',
        name: 'email',
        message: 'Введите email для проверки:'
    });

    console.log('Email валиден:', validator.isEmailValid(email));

    const { password } = await inquirer.prompt({
        type: 'password',
        name: 'password',
        message: 'Введите пароль для проверки:'
    });

    console.log('Пароль валиден:', validator.isPasswordValid(password));

    await showMenu();
};

console.log('=== Конфигуратор валидации ===');
showMenu();