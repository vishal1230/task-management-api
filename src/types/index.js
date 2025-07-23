/**
 * Task status enumeration
 */
const TaskStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
};

/**
 * Validates if a status is valid
 * @param {string} status - The status to validate
 * @returns {boolean} - True if valid, false otherwise
 */
const isValidTaskStatus = (status) => {
  return Object.values(TaskStatus).includes(status);
};

/**
 * Creates a standardized API response
 * @param {boolean} success - Whether the operation was successful
 * @param {string} message - Response message
 * @param {*} data - Response data (optional)
 * @param {string} error - Error message (optional)
 * @returns {Object} - Standardized API response
 */
const createApiResponse = (success, message, data = null, error = null) => {
  const response = {
    success,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  if (error !== null) {
    response.error = error;
  }

  return response;
};

/**
 * Creates pagination metadata
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} - Pagination metadata
 */
const createPagination = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
};

module.exports = {
  TaskStatus,
  isValidTaskStatus,
  createApiResponse,
  createPagination,
};
