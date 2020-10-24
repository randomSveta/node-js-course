const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      unique: false,
      required: true
    },
    order: {
      type: Number,
      unique: false,
      required: false
    },
    description: {
      type: String,
      unique: false,
      required: false
    },
    userId: {
      type: String,
      unique: false,
      required: false
    },
    boardId: {
      type: String,
      unique: false,
      required: true
    },
    columnId: {
      type: String,
      unique: false,
      required: true
    }
  },
  { versionKey: false }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task
};
