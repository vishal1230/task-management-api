const taskService = require('../services/taskService');
const { createApiResponse } = require('../types');

/**
 * Task controller class
 */
class TaskController {
  /**
   * Create a new task
   * POST /api/v1/tasks
   */
  async createTask(req, res) {
    try {
      const taskData = req.body;
      const task = await taskService.createTask(taskData);

      const response = createApiResponse(
        true,
        'Task created successfully',
        task
      );

      res.status(201).json(response);
    } catch (error) {
      const response = createApiResponse(
        false,
        'Failed to create task',
        null,
        error.message
      );
      res.status(500).json(response);
    }
  }

  /**
   * Get all tasks with optional filtering and pagination
   * GET /api/v1/tasks
   */
  async getAllTasks(req, res) {
    try {
      const query = {
        page: req.query.page ? parseInt(req.query.page) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit) : undefined,
        status: req.query.status,
        title: req.query.title,
      };

      const result = await taskService.getAllTasks(query);

      const response = createApiResponse(
        true,
        'Tasks retrieved successfully',
        result
      );

      res.status(200).json(response);
    } catch (error) {
      const response = createApiResponse(
        false,
        'Failed to retrieve tasks',
        null,
        error.message
      );
      res.status(500).json(response);
    }
  }

  /**
   * Get task by ID
   * GET /api/v1/tasks/:id
   */
  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);

      if (!task) {
        const response = createApiResponse(false, 'Task not found');
        return res.status(404).json(response);
      }

      const response = createApiResponse(
        true,
        'Task retrieved successfully',
        task
      );

      res.status(200).json(response);
    } catch (error) {
      const response = createApiResponse(
        false,
        'Failed to retrieve task',
        null,
        error.message
      );
      res.status(500).json(response);
    }
  }

  /**
   * Update task by ID
   * PUT /api/v1/tasks/:id
   */
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const task = await taskService.updateTask(id, updates);

      if (!task) {
        const response = createApiResponse(false, 'Task not found');
        return res.status(404).json(response);
      }

      const response = createApiResponse(
        true,
        'Task updated successfully',
        task
      );

      res.status(200).json(response);
    } catch (error) {
      const response = createApiResponse(
        false,
        'Failed to update task',
        null,
        error.message
      );
      res.status(500).json(response);
    }
  }

  /**
   * Delete task by ID
   * DELETE /api/v1/tasks/:id
   */
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const deleted = await taskService.deleteTask(id);

      if (!deleted) {
        const response = createApiResponse(false, 'Task not found');
        return res.status(404).json(response);
      }

      const response = createApiResponse(true, 'Task deleted successfully');
      res.status(200).json(response);
    } catch (error) {
      const response = createApiResponse(
        false,
        'Failed to delete task',
        null,
        error.message
      );
      res.status(500).json(response);
    }
  }

  /**
   * Get tasks statistics
   * GET /api/v1/tasks/stats
   */
  async getTasksStats(req, res) {
    try {
      const stats = await taskService.getTasksStats();

      const response = createApiResponse(
        true,
        'Statistics retrieved successfully',
        stats
      );

      res.status(200).json(response);
    } catch (error) {
      const response = createApiResponse(
        false,
        'Failed to retrieve statistics',
        null,
        error.message
      );
      res.status(500).json(response);
    }
  }
}

// Export singleton instance
const taskController = new TaskController();
module.exports = taskController;
