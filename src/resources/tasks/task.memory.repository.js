const DB = require('../boards/board.memory.repository');
const TASKS = DB.TASKS;
const Task = require('./task.model');

const getAll = async boardId => TASKS.filter(task => task.boardId === boardId);

const createTask = async task => {
  const createdTask = new Task(task);
  TASKS.push(createdTask);
  return createdTask;
};

const getTask = async (boardId, taskId) => {
  return TASKS.filter(
    task => task.boardId === boardId && task.id === taskId
  )[0];
};

const updateTask = async (boardId, taskId, updatedTask) => {
  TASKS.map(task => {
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
    return task;
  });
  return TASKS.filter(task => task.id === taskId)[0];
};

const deleteTask = async (boardId, taskId) => {
  const index = TASKS.findIndex(
    task => task.boardId === boardId && task.id === taskId
  );

  if (index + 1) TASKS.splice(index, 1);
  else return null;

  return 'Task has been deleted';
};

module.exports = { getAll, getTask, createTask, updateTask, deleteTask, TASKS };
