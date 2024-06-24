const express = require("express");

const TaskController = require("../controllers/task.controller");
const TaskModel = require("../models/task.model");

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.get("//:id", async (req, res) => {
    return new TaskController(req, res).getTaskById(req.params.id);
});

router.post("/", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);

        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.patch("//:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const taskToUpdate = await TaskModel.findById(taskId);

        const allowedUpdates = ["isCompleted"];
        const requestedUpdates = object.keys(taskData);

        for (upadate of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res.status(500).send("Invalid update");
            }
        }

        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

router.delete("//:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskToDelete = await TaskModel.findById(taskId);
        if (!taskToDelete) {
            return res.status(500).send("Essa tarefa não foi encontrada.");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send("Delete!");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
