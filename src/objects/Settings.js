const chalk = require('chalk');
const _colors = require('../colors');

class Settings {
    constructor() {
        this._currentColors = {
            dark: chalk.bgBlack,
            light: chalk.bgWhite
        }
        this._colorOptions = _colors;
    }

    getCurrentColors() {
        return this._colors;
    }

    setCurrentColors(dark, light) {
        this._colors = {
            dark,
            light
        }
    }

    getColorOptions() {
        return this._colorOptions;
    }

    printSettings() {
        console.clear()
        console.log()
    }
}

module.exports = Settings;