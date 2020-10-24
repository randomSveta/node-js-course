const { BOARDS } = require('../boards/boardsDB');
const Task = require('./task.model');

const TASKS = [
  new Task({
    title: 'board-0',
    order: 0,
    description: 'board-0-task-0-description',
    userId: 'user', // assignee
    boardId: BOARDS[0].id,
    columnId: BOARDS[0].columns[0].id
  }),

  new Task({
    title: 'board-0',
    order: 0,
    description: 'board-0-task-1-description',
    userId: 'user2', // assignee
    boardId: BOARDS[0].id,
    columnId: BOARDS[0].columns[0].id
  }),

  new Task({
    title: 'board-1',
    order: 0,
    description: 'board-1-task-2-description',
    userId: 'user3', // assignee
    boardId: BOARDS[1].id,
    columnId: BOARDS[1].columns[0].id
  })
];

exports.TASKS = TASKS;
