const { v4: uuidv4 } = require('uuid');
const { TaskStatus } = require('../types');

/**
 * Task model class
 */
class TaskModel {
  /**
   * Creates a new Task instance
   * @param {string} id - Task ID
   * @param {string} title - Task title
   * @param {string} description - Task description
   * @param {string} status - Task status
   * @param {Date} createdAt - Creation date
   * @param {Date} updatedAt - Last update date
   */
  constructor(id, title, description, status, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Creates a new task instance
   * @param {string} title - Task title
   * @param {string} description - Task description
   * @param {string} status - Task status (default: PENDING)
   * @returns {TaskModel} - New task instance
   */
  static create(title, description, status = TaskStatus.PENDING) {
    const now = new Date();
    return new TaskModel(uuidv4(), title, description, status, now, now);
  }

  /**
   * Updates task properties
   * @param {Object} updates - Updates to apply
   * @param {string} updates.title - New title
   * @param {string} updates.description - New description
   * @param {string} updates.status - New status
   */
  update(updates) {
    if (updates.title !== undefined) {
      this.title = updates.title;
    }
    if (updates.description !== undefined) {
      this.description = updates.description;
    }
    if (updates.status !== undefined) {
      this.status = updates.status;
    }
    this.updatedAt = new Date();
  }

  /**
   * Converts task to plain object
   * @returns {Object} - Task as plain object
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = TaskModel;
