const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({
    id = uuid(),
    title = 'BOARD',
    columns = columns.map(element => new Column(element))
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
