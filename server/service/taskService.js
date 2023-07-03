const userModel = require('../models/user-model');
const taskModel = require('../models/task-model');
const ApiError = require('../exceptions/api-error');

class TaskService {

   async createTask(userId, title) {

      const user = await userModel.findById(userId);

      if (!user) {
         throw ApiError.BadRequest('User not found');
      }

      const task = await taskModel.create({
         user: userId,
         title
      })

      return task;
   }

   async getAllTask(userId) {

      const user = await userModel.findById(userId);

      if (!user) {
         throw ApiError.BadRequest('User not found');
      }

      const tasks = await taskModel.find({ user: userId });

      return tasks;
   }

   async removeTask(userId, taskId) {

      const user = await userModel.findById(userId);

      if (!user) {
         throw ApiError.BadRequest('User not found');
      }

      const task = await taskModel.findById(taskId);

      if (!task) {
         throw ApiError.BadRequest('Task not found');
      }

      if (task.user.toString() !== userId) {
         throw ApiError.UnauthorizedError();
      }

      await taskModel.findByIdAndDelete(taskId);

      return { success: true }
   }

   async updateTask(userId, taskId, updatedData) {

      const user = await userModel.findById(userId);

      if (!user) {
         throw ApiError.BadRequest('User not found');
      }

      const task = await taskModel.findById(taskId);

      if (!task) {
         throw ApiError.BadRequest('Ticket not found');
      }

      if (task.user.toString() !== userId) {
         throw ApiError.UnauthorizedError();
      }

      const updatedTask = await taskModel.findByIdAndUpdate(
         taskId,
         updatedData,
         { new: true }
      );

      return updatedTask;
   }

}

module.exports = new TaskService();