const ApiError = require('../exceptions/api-error');
const taskService = require('../service/taskService');
const { body, validationResult } = require('express-validator');

class TaskController {

   async createTask(req, res, next) {
      try {
         const { title } = req.body;
         if (!title) {
            throw ApiError.BadRequest('Please add title')
         }
         const task = await taskService.createTask(req.user.id, title);
         return res.json(task);
      } catch (e) {
         next(e);
      }
   }

   async getAllTasks(req, res, next) {
      try {
         const tickets = await taskService.getAllTask(req.user.id);
         return res.json(tickets);
      } catch (e) {
         next(e);
      }
   }

   async removeTask(req, res, next) {
      try {
         const result = await taskService.removeTask(req.user.id, req.params.id);
         return res.json(result);
      } catch (e) {
         next(e)
      }
   }

   async updateTask(req, res, next) {
      try {
         console.log(req);
         const updatedTask = await taskService.updateTask(
            req.user.id,
            req.params.id,
            req.body
         );
         return res.json(updatedTask);
      } catch (e) {
         next(e)
      }
   }

}

module.exports = new TaskController();