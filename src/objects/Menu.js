import chalk from 'chalk';
import Settings from './Settings.js';
import promptly from 'promptly'

class Menu {
    constructor() {
        this._options = {
            local: "Local Game",
            online: "Online Game",
            settings: "Settings",
            quit: "Quit"
        }
        this._currentSelection = this._options["Local Game"]
        this._settings = new Settings()
    }

    getSettings() {
        return this._settings;
    }

    getOptions() {
        return this._options;
    }

    getCurrentSelection() {
        return this._currentSelection;
    }

    async processKeypress() {
        process.stdin.setRawMode(true)
        process.stdin.resume()
        process.stdin.setEncoding('utf-8')

        return new Promise(resolve => process.stdin.on('data', key => {
            process.stdout.write(key)
            resolve()
        }))
    }

    async printMenu() {
        console.clear();
        console.log(`

        
        
        
        
        
        
        




                            ${this.getCurrentSelection() == this.getOptions().local ? this.getSettings().getCurrentColors().light(this.getOptions().local) : this.getOptions().local}
                            ${this.getCurrentSelection() == this.getOptions().online ? this.getSettings().getCurrentColors().light(this.getOptions().online) : this.getOptions().online}
                            ${this.getCurrentSelection() == this.getOptions().settings ? this.getSettings().getCurrentColors().light(this.getOptions().settings) : this.getOptions().settings}
                            ${this.getCurrentSelection() == this.getOptions().quit ? this.getSettings().getCurrentColors().light(this.getOptions().quit) : this.getOptions().quit}
        
        
        
        
        
        
        
        
        
        
        
        
        `)
        await this.processKeypress()
    }
}

export default Menu;