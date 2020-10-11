const Task = require('./task.model');
const BOARDS = require('../boards/board.memory.repository');
const USERS = require('../users/user.memory.repository');

function addTasksToDB() {
  const tasks = [];

  BOARDS.BOARDS.forEach(board => {
    for (let i = 0; i < 3; i++) {
      const createdTask = new Task({
        title: `${board.id} ${i}`,
        order: 0,
        description: `${board.id}description ${i}`,
        userId: USERS.USERS[i].id, // assignee
        boardId: board.id,
        columnId: board.columns[0].id
      });

      tasks.push(createdTask);
    }
  });

  return tasks;
}

module.exports = {
  addTasksToDB
};
