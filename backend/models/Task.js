const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

module.exports = mongoose.model("Task", TaskSchema);
