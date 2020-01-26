const { RANK } = require("./constants");

module.exports = {
  checkInput: (to, from, move) => {
    if (
      typeof to[0] !== "string" ||
      isNaN(to[1]) ||
      typeof from[0] !== "string" ||
      isNaN(from[1]) ||
      !RANK.indexOf(to[0].toUpperCase()) ||
      !RANK.indexOf(from[0].toUpperCase()) ||
      move.length > 5
    ) {
      return true;
    }
  },
  getRank: (space, loc) => {
    return (result =
      loc === "to"
        ? (result = space.slice(3).toUpperCase() + space.slice(5))
        : space.slice(1, 2).toUpperCase() + space.slice(2, 3));
  },
  kingCopy: king => {
    return Object.assign(Object.create(Object.getPrototypeOf(king)), king);
  }
};
