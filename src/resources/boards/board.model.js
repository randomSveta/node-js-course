const mongoose = require('mongoose');
const { Schema } = mongoose;
const columnSchema = new Schema(
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
    }
  },
  { versionKey: false }
);

const boardSchema = new Schema(
  {
    title: {
      type: String,
      unique: false,
      required: true
    },
    columns: [columnSchema]
  },
  { versionKey: false }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = {
  Board
};
