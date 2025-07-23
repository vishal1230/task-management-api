const Joi = require('joi');
const { TaskStatus } = require('../types');

// Schema for creating a task
const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    'string.empty': 'Title is required',
    'string.max': 'Title must not exceed 100 characters',
  }),
  description: Joi.string().min(1).max(500).required().messages({
    'string.empty': 'Description is required',
    'string.max': 'Description must not exceed 500 characters',
  }),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .optional(),
});

// Schema for updating a task
const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100).optional(),
  description: Joi.string().min(1).max(500).optional(),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .optional(),
}).min(1);

// Schema for query parameters
const querySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .optional(),
  title: Joi.string().optional(),
});

// Schema for UUID validation
const uuidSchema = Joi.string().uuid().required();

/**
 * Middleware to validate task creation data
 */
const validateCreateTask = (req, res, next) => {
  const { error } = createTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.details[0].message,
    });
  }
  next();
};

/**
 * Middleware to validate task update data
 */
const validateUpdateTask = (req, res, next) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.details[0].message,
    });
  }
  next();
};

/**
 * Middleware to validate query parameters
 */
const validateQuery = (req, res, next) => {
  const { error } = querySchema.validate(req.query);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid query parameters',
      error: error.details[0].message,
    });
  }
  next();
};

/**
 * Middleware to validate task ID parameter
 */
const validateTaskId = (req, res, next) => {
  const { error } = uuidSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid task ID format',
      error: 'Task ID must be a valid UUID',
    });
  }
  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateQuery,
  validateTaskId,
};
