import { RANK } from './constants.js'

export function kingCopy (king) { Object.assign(Object.create(Object.getPrototypeOf(king)), king) }

export function getRank (space, loc) {
  return (result =
    loc === "to"
      ? (result = space.slice(3).toUpperCase() + space.slice(5))
      : space.slice(1, 2).toUpperCase() + space.slice(2, 3));
}

export function checkInput (to, from, move) {
  if (!to || !from || !move) {
    return true;
  }

  return (
    typeof to[0] !== "string" ||
    isNaN(to[1]) ||
    typeof from[0] !== "string" ||
    isNaN(from[1]) ||
    !RANK.indexOf(to[0].toUpperCase()) ||
    !RANK.indexOf(from[0].toUpperCase()) ||
    move.length !== 5 ||
    move.indexOf("0") !== -1
  );
}
