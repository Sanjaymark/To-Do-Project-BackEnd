import express, { response } from "express";
import Task from "../models/tasks.js";
import { isAdmin } from "../Authentication/Adminauth.js";
import { isUser } from "../Authentication/Userauth.js";
import { requireToken } from "../Authentication/tokenauth.js";



const router = express.Router();


// 1. Create a new task (POST request)
router.post("/add",isAdmin, async (req, res) => {
  try {
    const task = new Task(req.body); // Create a new task using request body data
    await task.save(); // Save the task to the database
    res.status(201).json(task); // Return the created task as JSON
  } catch (error) {
    res.status(400).json({ error: "Error creating task" });
  }
});



// 2. Get a list of all tasks (GET request)
router.get("/all",requireToken, async (req, res) => {
  try {
    const tasks = await Task.find(); // Retrieve all tasks from the database
    res.json(tasks); // Return the tasks as JSON
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



// 3. Get a specific task by ID (GET request)
router.get("/:id",requireToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Find the task by its ID
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task); // Return the task as JSON
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



// 4. Update a task by ID (PUT request)
router.put("/edit/:id",requireToken, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated task
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task); // Return the updated task as JSON
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



// 5. Delete a task by ID (DELETE request)
router.delete("/delete/:id",isAdmin, async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id); // Find and remove the task by its ID
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted" }); // Return a success message as JSON
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



export const taskRouter = router;