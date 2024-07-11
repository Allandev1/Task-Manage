const TaskModel = require("../models/task.model");
const { notFoundError } = require("../errors/mongodb.error");
const { notAllowedFieldsToUpdateError } = require("../errors/general.erros");
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async getAll() {
        try {
            const task = await TaskModel.find({});
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById() {
        try {
            const taskId = this.req.params.id;

            const task = await TaskModel.findById();

            if (!task) return notFoundError(this.res);

            this.res.status(200).send(task);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async create() {
        try {
            const newTask = new TaskModel(this.req.body);

            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(404).send(error.message);
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;
            const taskToUpdate = await TaskModel.findById(taskId);

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            const allowedUpdates = ["isCompleted"];
            const requestedUpdates = object.keys(taskData);

            for (const upadate of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return notAllowedFieldsToUpdateError(this.res);
                }
            }

            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
    async delete() {
        try {
            const taskId = this.req.params.id;
            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete) {
                return notFoundError(this.res);
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);

            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
