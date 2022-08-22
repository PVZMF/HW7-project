class Mohreh {
  constructor(color, x, y, board) {
    this._color = color;
    this.x = x;
    this.y = y;
    this._board = board;
    this._name = "";
  }
  get name() {
    return this._name;
  }
  set name(value) {
    throw new Error("you can't change the name");
  }
  move(x, y) {
    this.x = x;
    this.y = y;
    this._board.takeCell(this, x, y);
    console.log(this._board.snapShot);
    return this._board.snapShot;
  }
  set x(value) {
    if (value > "h" || value < "a") {
      throw new Error("the value of x is invalid");
    }
    this._x = value;
  }
  set y(value) {
    if (value > 8 || value < 1) {
      throw new Error("the value of y is invalid");
    }
    this._y = value;
  }
  get color() {
    return this._color;
  }
  get location() {
    return { x: this._x, y: this._y };
  }
}

class Board {
  constructor() {
    this._board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
  }
  takeCell(obj, x, y) {
    let _x = x.charCodeAt(0) - 97;
    let _y = y - 1;
    let oldObj = this._board[_y][_x];
    if (oldObj && oldObj.color !== obj.color) {
      oldObj = null;
    } else if (oldObj && oldObj.color === obj.color) {
      throw new Error("this cell already is taken by you");
    }
    this._board[_y][_x] = obj;
  }
  get snapShot() {
    return this._board;
  }
  getCell(x, y) {
    let _x = x.charCodeAt(0) - 97;
    let _y = y - 1;
    return this._board[_y][_x];
  }
}

class Soldier extends Mohreh {
  constructor(color, x, y, board) {
    super(color, x, y, board);
    this._name = "Soldier";
  }
  move(x, y) {
    if (x !== this._x || y !== this._y + 1) {
      throw new Error("you can't move here");
    }
    super.move(x, y);
  }
}

class Rook extends Mohreh {
  constructor(color, x, y, board) {
    super(color, x, y, board);
    this._name = "Rook";
  }

  move(x, y) {
    if ( this._x !== x || this._y !== y) {
      throw new Error("you can't move here");
    }
    super.move(x, y);
  }
}

class Bishop extends Mohreh {
  constructor(color, x, y, board) {
    super(color, x, y, board);
    this._name = "Bishop";
  }

  move(x, y) {
    if ( Math.abs(this._x - x) !== Math.abs(this._y - y)) {
      throw new Error("you can't move here");
    }
    super.move(x, y);
  }
}

class Night extends Mohreh {
  constructor(color, x, y, board) {
    super(color, x, y, board);
    this._name = "Night";
  }

  move(x, y) {
    if ( (Math.abs(this._x-x) !==2 && Math.abs(this._y-y)) || (Math.abs(this._y-y) !==2 && Math.abs(this._x-x))) {
      throw new Error("you can't move here");
    }
    super.move(x, y);
  }
}

class Queen extends Mohreh {
  constructor(color, x, y, board) {
    super(color, x, y, board);
    this._name = "Queen";
  }

  move(x, y) {
    if ( (Math.abs(this._x - x) !== Math.abs(this._y - y)) && (this._x !== x || this._y !== y)) {
      throw new Error("you can't move here");
    }
    super.move(x, y);
  }
}

class King extends Mohreh {
  constructor(color, x, y, board) {
    super(color, x, y, board);
    this._name = "Soldier";
  }
  move(x, y) {
    if ((this._x-x)<2 && y-this._y<2) {
      throw new Error("you can't move here");
    }
    super.move(x, y);
  }
}

const board = new Board();
const soldier = new Soldier("white", "a", 2, board);
const soldier2 = new Soldier("white", "b", 4,board);
soldier.move("a", 3);
