const { BOARDS } = require('../boards/boardsDB');
const { USERS } = require('../users/usersDB');
const Task = require('./task.model');

const TASKS = [
  new Task({
    title: 'board-0',
    order: 0,
    description: 'board-0-task-0-description',
    userId: USERS[1].id, // assignee
    boardId: BOARDS[0].id,
    columnId: BOARDS[0].columns[0].id
  }),

  new Task({
    title: 'board-0',
    order: 0,
    description: 'board-0-task-1-description',
    userId: USERS[1].id, // assignee
    boardId: BOARDS[0].id,
    columnId: BOARDS[0].columns[0].id
  }),

  new Task({
    title: 'board-1',
    order: 0,
    description: 'board-1-task-2-description',
    userId: USERS[2].id, // assignee
    boardId: BOARDS[1].id,
    columnId: BOARDS[1].columns[0].id
  })
];

exports.TASKS = TASKS;
