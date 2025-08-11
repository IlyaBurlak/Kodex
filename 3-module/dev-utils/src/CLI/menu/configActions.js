const { resetConfig, saveConfig, getConfig } = require('../configManager');

module.exports = function(dependencies) {
    return {
        resetConfiguration: async function() {
            resetConfig();
            console.log('Настройки сброшены к значениям по умолчанию');
            await dependencies.showMainMenu();
        },
        saveConfiguration: function() {
            saveConfig(getConfig());
            console.log('Настройки сохранены!');
            process.exit(0);
        }
    };
};