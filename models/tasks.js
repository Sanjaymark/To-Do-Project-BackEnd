import mongoose from "mongoose";

// Define the Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: String,
  },
  priority: {
    type: String,
  },
  completed: {
    type: String,
  },
});

// Create the Task model using the schema
const Task = mongoose.model("Task", taskSchema);

// Export the Task model
export default Task;
