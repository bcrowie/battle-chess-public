import fs from 'fs'

class SavedStateLoader {
  constructor(fileName) {
    this._fileName = fileName;
  }

  async load() {
    const data = await fs.readFileSync(this._fileName, "utf8");
    const state = JSON.parse(data);
    return state;
  }

  async save(data) {
    data._board._message = "Saved";
    const saveData = JSON.stringify(data);
    const fileName = `Battle-Chess ${this.getTimeString()}.json`;
    await fs.writeFile(fileName, saveData, err => {
      if (err) throw new Error();
    });
  }

  getTimeString() {
    const today = new Date();

    const getDate = () => {
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      return date;
    };

    const getTime = () => {
      const hour = today.getHours();
      const min =
        today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
      const sec =
        today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
      const time = hour + "." + min + "." + sec;
      return time;
    };

    const date = getDate() + " " + getTime();
    return date;
  }
}

export default SavedStateLoader;
