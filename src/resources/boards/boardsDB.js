const Board = require('./board.model');
const Column = require('./column.model');
// { id, title, columns }
// { id, title, order }
function addBoardsToDB() {
  const boards = [];

  for (let i = 0; i < 3; i++) {
    const createdColumn = new Column({ title: `column-${i}`, order: 0 });
    const createdColumns = [];

    createdColumns.push(createdColumn);
    createdColumns.push(createdColumn);

    const createdBoard = new Board({
      title: `board-${i}`,
      columns: createdColumns
    });
    boards.push(createdBoard);
  }

  return boards;
}

module.exports = {
  addBoardsToDB
};
