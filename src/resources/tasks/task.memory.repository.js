const { TASKS } = require('./tasksDB');
const Task = require('./task.model');

const getAll = async boardId => {
  return TASKS.filter(task => task.boardId === boardId);
};

const createTask = async (boardId, task) => {
  task.boardId = boardId;

  const createdTask = new Task(task);
  TASKS.push(createdTask);

  return createdTask;
};

const getTask = async (boardId, taskId) => {
  const index = TASKS.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  if (index + 1) return TASKS[index];
};

const updateTask = async (boardId, taskId, updatedTask) => {
  TASKS.forEach(task => {
    if (task.boardId === boardId && task.id === taskId) {
      if (updatedTask.title !== task.title) task.title = updatedTask.title;
      if (updatedTask.order !== task.order) task.order = updatedTask.order;
      if (updatedTask.description !== task.description) {
        task.description = updatedTask.description;
      }
      if (updatedTask.userId !== task.userId) task.userId = updatedTask.userId;
      if (updatedTask.boardId !== task.boardId) {
        task.boardId = updatedTask.boardId;
      }
      if (updatedTask.columnId !== task.columnId) {
        task.columnId = updatedTask.columnId;
      }
    }
  });
  return TASKS.filter(task => task.id === taskId)[0];
};

const deleteTask = async (boardId, taskId) => {
  const index = TASKS.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );
  if (index + 1) {
    TASKS.splice(index, 1);
    return 'Task has been deleted';
  }
};

module.exports = { getAll, getTask, createTask, updateTask, deleteTask, TASKS };
