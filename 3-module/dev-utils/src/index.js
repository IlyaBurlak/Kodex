const validators = require('./utils/validators');
const generators = require('./utils/generators');

module.exports = {
    ...validators,
    ...generators,

    generateEmails: generators.generateMultipleEmails,
    generatePasswords: generators.generateMultiplePasswords,
    generateSets: generators.generateMultipleSets,

    getConfig: () => require('./CLI/configManager').getConfig(),
    resetConfig: () => require('./CLI/configManager').resetConfig()
};