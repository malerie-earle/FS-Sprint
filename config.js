const fs = require('fs');
const configFilePath = './config.json';

function handleConfig(options) {
    if (options.includes('--show')) {
        showConfig();
    } else if (options.includes('--reset')) {
        resetConfig();
    } else if (options.includes('--set')) {
        // Extract the specific setting and its value from options
        const index = options.indexOf('--set');
        const setting = options[index + 1];
        const value = options[index + 2];
        setConfig(setting, value);
    } else {
        console.log('Invalid config command. Use "app --help" to see available commands.');
    }
}

function showConfig() {
    try {
        const configData = fs.readFileSync(configFilePath, 'utf8');
        console.log(configData);
    } catch (err) {
        console.error('Error reading config file:', err);
    }
}

function resetConfig() {
    // Reset config to default values
    const defaultConfig = { /* Define your default configuration here */ };

    try {
        fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2));
        console.log('Config file reset to default.');
    } catch (err) {
        console.error('Error resetting config file:', err);
    }
}

function setConfig(setting, value) {
    try {
        let config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
        config[setting] = value;
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
        console.log(`Config setting '${setting}' updated to '${value}'.`);
    } catch (err) {
        console.error('Error updating config file:', err);
    }
}

module.exports = { handleConfig };
