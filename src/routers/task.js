const express = require('express')
const Task = require('../db/models/tasks')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post("/tasks", auth, async (req, res) => {
  const userId = req.user._id
  const task = new Task({
    ...req.body,
    owner: userId,
  });
  try {
    console.log(`Attempting to add task owned by ${userId}`);
    await task.save();
    res.status(201).send(task);
    console.log('Added task successfully.')
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks/:id", auth,  async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user._id;

  try {
    console.log(`Attempting to get ${taskId} task owned by ${userId}`);
    const task = await Task.findOne({_id: taskId, owner: userId})
    if (!task) {
      console.log("Task was not found.");
      return res.status(404).send();
    }
    res.send(task);
    console.log("Task was found.");
  } catch (e) {
    console.log(e)
    res.status(500).send();
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    console.log(`Getting all tasks for ${req.user._id}`)
    await req.user.populate("tasks");
    res.send(req.user.tasks);
    console.log('All task have been found')
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth,  async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const taskId = req.params.id;
    const userId = req.user._id;
    console.log(`Attempting to update ${taskId} task owned by ${userId}`);
    const task = await Task.findOne({ _id: taskId, owner: userId });
    
    if (!task) {
      console.log("Task was not updated.");
      return res.status(404).send();
    }

    updates.forEach(update => task[update] = req.body[update])

    await task.save()
    res.send(task);
    console.log(`Task was updated!`);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id
    const userId = req.user._id
    console.log(`Attempting to delete ${taskId} task owned by ${userId}`);
    const task = await Task.findOneAndDelete({
      _id: taskId,
      owner: userId,
    });
    if (!task) {
      console.log('Task was not deleted.')
      return res.status(404).send();
    }
    res.send(task);
    console.log(`Task was deleted!`);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router