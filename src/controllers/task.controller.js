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
}

module.exports = TaskController;
