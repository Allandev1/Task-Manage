const TaskModel = require("../models/task.model");
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    async getTasks() {
        try {
            const task = await TaskModel.find({});
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id;

            const task = await TaskModel.findById();

            if (!task) {
                return this.res.status(404).send("Task not found");
            }
            this.res.status(200).send(task);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
module.exports = TaskController;
