const createMainMenu = require('./mainMenu');
const createEmailConfig = require('./emailConfig');
const createPasswordConfig = require('./passwordConfig');
const createGeneratorMenu = require('./generatorMenu');
const createTestConfig = require('./testConfig');
const createConfigActions = require('./configActions');
const { getConfig } = require('../configManager');

function setupMenu() {
    const dependencies = {
        showMainMenu: null
    };

    const emailConfig = createEmailConfig(dependencies);
    const passwordConfig = createPasswordConfig(dependencies);
    const generatorMenu = createGeneratorMenu(dependencies);
    const testConfig = createTestConfig(dependencies);
    const configActions = createConfigActions(dependencies);

    const mainMenu = createMainMenu({
        showEmailConfig: emailConfig,
        showPasswordConfig: passwordConfig,
        showGeneratorMenu: generatorMenu,
        testConfiguration: testConfig,
        resetConfiguration: configActions.resetConfiguration,
        saveConfiguration: configActions.saveConfiguration
    });

    dependencies.showMainMenu = mainMenu;

    return mainMenu;
}

module.exports = setupMenu;