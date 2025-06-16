const Joi = require('joi');

registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  // phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  password: Joi.string().min(6).required(),
});

loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

addNewList = Joi.object({
  title: Joi.string().min(3).required(),
});

addNewTask = Joi.object({
  listId: Joi.string().required(),
  taskTitle: Joi.string().min(3).required(),
  taskDes: Joi.string().min(5).required(),
  DueDate: Joi.date().greater('now').required(),
  taskPriority: Joi.string().valid('low', 'medium', 'high').required(),
});

checkListId = Joi.object({
  priority: Joi.string().required(),
});

module.exports = {registerSchema, loginSchema, addNewList, addNewTask, checkListId}
