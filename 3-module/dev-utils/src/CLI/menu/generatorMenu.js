const inquirer = require('inquirer');
const { generateTestPassword, generateTestEmail } = require('../../utils/generators');

module.exports = function createGeneratorMenu(dependencies) {
    return async function showGeneratorMenu() {
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
            return await dependencies.showMainMenu();
        }

        const { count } = await inquirer.prompt({
            type: 'number',
            name: 'count',
            message: 'Сколько элементов сгенерировать?',
            default: 1,
            validate: input => input > 0 || 'Число должно быть больше 0'
        });

        switch (dataType) {
            case 'passwords': generatePasswords(count); break;
            case 'emails': generateEmails(count); break;
            case 'full': generateFullSet(count); break;
        }

        await dependencies.showMainMenu();
    };
};