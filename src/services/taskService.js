const TaskModel = require('../models/Task');
const database = require('../utils/database');
const { createPagination } = require('../types');

/**
 * Task service class
 */
class TaskService {
  /**
   * Create a new task
   * @param {Object} taskData - Task data
   * @param {string} taskData.title - Task title
   * @param {string} taskData.description - Task description
   * @param {string} taskData.status - Task status
   * @returns {Promise<Object>} - Created task
   */
  async createTask(taskData) {
    const task = TaskModel.create(
      taskData.title,
      taskData.description,
      taskData.status
    );

    const createdTask = database.create(task);
    return createdTask.toJSON();
  }

  /**
   * Get all tasks with optional filtering and pagination
   * @param {Object} query - Query parameters
   * @param {number} query.page - Page number
   * @param {number} query.limit - Items per page
   * @param {string} query.status - Filter by status
   * @param {string} query.title - Search by title
   * @returns {Promise<Object>} - Paginated tasks response
   */
  async getAllTasks(query) {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const { tasks, total } = database.findAll({
      status: query.status,
      title: query.title,
      page,
      limit,
    });

    const pagination = createPagination(page, limit, total);

    return {
      data: tasks.map((task) => task.toJSON()),
      pagination,
    };
  }

  /**
   * Get task by ID
   * @param {string} id - Task ID
   * @returns {Promise<Object|null>} - Task or null if not found
   */
  async getTaskById(id) {
    const task = database.findById(id);
    return task ? task.toJSON() : null;
  }

  /**
   * Update task by ID
   * @param {string} id - Task ID
   * @param {Object} updates - Updates to apply
   * @returns {Promise<Object|null>} - Updated task or null if not found
   */
  async updateTask(id, updates) {
    const updatedTask = database.updateById(id, updates);
    return updatedTask ? updatedTask.toJSON() : null;
  }

  /**
   * Delete task by ID
   * @param {string} id - Task ID
   * @returns {Promise<boolean>} - True if deleted, false if not found
   */
  async deleteTask(id) {
    return database.deleteById(id);
  }

  /**
   * Get tasks statistics
   * @returns {Promise<Object>} - Task statistics
   */
  async getTasksStats() {
    const { tasks } = database.findAll();

    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'PENDING').length,
      inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
      completed: tasks.filter((t) => t.status === 'COMPLETED').length,
    };
  }
}

// Export singleton instance
const taskService = new TaskService();
module.exports = taskService;
