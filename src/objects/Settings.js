import chalk from 'chalk'
import { COLORS } from '../colors.js'

class Settings {
    constructor() {
        this._currentColors = {
            dark: chalk.bgBlack,
            light: chalk.bgWhite
        }
        this._colorOptions = COLORS;
    }

    getCurrentColors() {
        return this._currentColors;
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
        console.log(`
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        `)
    }
}

export default Settings;