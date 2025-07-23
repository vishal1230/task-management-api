/**
 * In-memory database simulation
 * In production, this would be replaced with a real database like PostgreSQL, MongoDB, etc.
 */
class InMemoryDatabase {
  constructor() {
    this.tasks = [];
  }

  /**
   * Create a new task
   * @param {TaskModel} task - Task to create
   * @returns {TaskModel} - Created task
   */
  create(task) {
    this.tasks.push(task);
    return task;
  }

  /**
   * Find all tasks with optional filtering and pagination
   * @param {Object} filters - Filter options
   * @param {string} filters.status - Filter by status
   * @param {string} filters.title - Filter by title (case-insensitive)
   * @param {number} filters.page - Page number for pagination
   * @param {number} filters.limit - Items per page
   * @returns {Object} - Object containing filtered tasks and total count
   */
  findAll(filters = {}) {
    let filteredTasks = [...this.tasks];

    // Apply status filter
    if (filters.status) {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === filters.status
      );
    }

    // Apply title search filter
    if (filters.title) {
      const searchTerm = filters.title.toLowerCase();
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm)
      );
    }

    const total = filteredTasks.length;

    // Apply pagination
    if (filters.page && filters.limit) {
      const startIndex = (filters.page - 1) * filters.limit;
      filteredTasks = filteredTasks.slice(
        startIndex,
        startIndex + filters.limit
      );
    }

    // Sort by creation date (newest first)
    filteredTasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return { tasks: filteredTasks, total };
  }

  /**
   * Find task by ID
   * @param {string} id - Task ID
   * @returns {TaskModel|undefined} - Found task or undefined
   */
  findById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  /**
   * Update task by ID
   * @param {string} id - Task ID
   * @param {Object} updates - Updates to apply
   * @returns {TaskModel|null} - Updated task or null if not found
   */
  updateById(id, updates) {
    const task = this.findById(id);
    if (!task) return null;

    task.update(updates);
    return task;
  }

  /**
   * Delete task by ID
   * @param {string} id - Task ID
   * @returns {boolean} - True if deleted, false if not found
   */
  deleteById(id) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }

  /**
   * Get total count of tasks
   * @returns {number} - Total task count
   */
  count() {
    return this.tasks.length;
  }
}

// Export singleton instance
const database = new InMemoryDatabase();
module.exports = database;
