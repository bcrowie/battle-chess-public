const fs = require("fs");

class SavedStateLoader {
  constructor(fileName) {
    this._fileName = fileName;
  }

  async load() {
    const data = fs.readFileSync(this._fileName, "utf8");
    const state = JSON.parse(data);
    return state;
  }

  async save(data) {
    data._board._message = "";
    let saveData = JSON.stringify(data);
    let date = "Battle-Chess.json";
    fs.writeFile(date, saveData, err => {
      if (err) {
        console.log(err);
      }
    });
  }
}

module.exports = SavedStateLoader;
