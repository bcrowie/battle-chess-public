const chalk = require('chalk');
const Settings = require('./Settings');

class Menu {
    constructor() {
        this._options = {
            "Local Game": "Local Game",
            "Online Game": "Online Game",
            "Settings": "Settings"
        }
        this._currentSelection = this._options["Local Game"]
        this._settings = new Settings()
    }

    getOptions() {
        return this._options;
    }

    printMenu() {
        console.clear();
        console.log(`

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        `)
    }
}

module.exports = Menu;