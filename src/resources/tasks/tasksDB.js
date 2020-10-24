const Task = require('./task.model');

const TASKS = [
  new Task({
    title: 'board-0',
    order: 0,
    description: 'board-0-task-0-description',
    userId: 'user', // assignee
    boardId: 'board1',
    columnId: 'columns'
  }),

  new Task({
    title: 'board-0',
    order: 0,
    description: 'board-0-task-1-description',
    userId: 'user2', // assignee
    boardId: 'board1',
    columnId: 'columns'
  }),

  new Task({
    title: 'board-1',
    order: 0,
    description: 'board-1-task-2-description',
    userId: 'user3', // assignee
    boardId: 'board1',
    columnId: 'columns'
  })
];

exports.TASKS = TASKS;
