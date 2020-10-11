const Board = require('./board.model');
const Column = require('./column.model');

const BOARDS = [
  new Board({
    title: 'board-1',
    columns: [
      new Column({ title: 'board-1-column-1', order: 0 }),
      new Column({ title: 'board-1-column-2', order: 0 })
    ]
  }),
  new Board({
    title: 'board-2',
    columns: [new Column({ title: 'board-2-column-2', order: 0 })]
  }),
  new Board({
    title: 'board-3',
    columns: [
      new Column({ title: 'board-3-column-1', order: 0 }),
      new Column({ title: 'board-3-column-2', order: 0 })
    ]
  })
];

exports.BOARDS = BOARDS;
