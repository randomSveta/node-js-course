const Board = require('./boards/board.model');
const Column = require('./boards/column.model');
const Task = require('./tasks/task.model');
const User = require('./users/user.model');

function addDataToDB(number) {
  const DB = { USERS: [], BOARDS: [], TASKS: [] };

  for (let i = 0; i < number; i++) {
    // users
    const createdUser = new User({
      name: `user-${i}`,
      login: `user-login-${i}`,
      password: `user-password-${i}`
    });

    DB.USERS.push(createdUser);

    // boards
    const createdColumn = new Column({ title: `column-${i}`, order: 0 });
    const createdColumns = [];

    createdColumns.push(createdColumn);
    createdColumns.push(createdColumn);

    const createdBoard = new Board({
      title: `board-${i}`,
      columns: createdColumns
    });
    DB.BOARDS.push(createdBoard);
  }

  // tasks
  DB.BOARDS.forEach(board => {
    for (let i = 0; i < number; i++) {
      const createdTask = new Task({
        title: `${board.id} ${i}`,
        order: 0,
        description: `${board.id}description ${i}`,
        userId: DB.USERS[i].id, // assignee
        boardId: board.id,
        columnId: board.columns[0].id
      });
      DB.TASKS.push(createdTask);
    }
  });

  return DB;
}

module.exports = {
  addDataToDB
};
