class Piece {
  constructor(health, damage, location, color, startLoc) {
    this._color = color;
    this._damage = damage;
    this._health = health;
    this._location = location;
    this._startLoc = startLoc;
    this._unicode = this.getUnicode(color);
  }

  getColor() {
    return this._color;
  }

  getDamage() {
    return this._damage;
  }

  getHealth() {
    return this._health.toString().length < 2
      ? (this._health += " ")
      : this._health;
  }

  setHealth(damage) {
    this._health = this._health - damage;
  }

  getStartLoc() {
    return this._startLoc;
  }

  getLocation() {
    return this._location;
  }

  setLocation(loc) {
    this._location = loc;
    return true;
  }

  getName() {
    return this.constructor.name;
  }

  getUnicode() {
    return this._unicode;
  }

  setUnicode() {
    throw new Error("Cannot instantiate abstract method.");
  }

  move(loc) {
    return this._canMove(loc) ? true : false;
  }

  _canMove() {
    throw new Error("Cannot instantiate abstract method");
  }

  attack(to, from) {
    return this._canAttack(to, from) ? true : false;
  }

  _canAttack() {
    throw new Error("Cannot instantiate abstract method");
  }
}

export default Piece;
