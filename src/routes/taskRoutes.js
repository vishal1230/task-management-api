const { Router } = require('express');
const taskController = require('../controllers/taskController');
const {
  validateCreateTask,
  validateUpdateTask,
  validateQuery,
  validateTaskId,
} = require('../middleware/validation');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the task
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *           description: Task title
 *         description:
 *           type: string
 *           minLength: 1
 *           maxLength: 500
 *           description: Task description
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED]
 *           description: Task status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Task creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Task last update timestamp
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *                 default: PENDING
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  validateCreateTask,
  taskController.createTask.bind(taskController)
);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks with optional filtering and pagination
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of tasks per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, COMPLETED]
 *         description: Filter by task status
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search by task title
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error
 */
router.get('/', validateQuery, taskController.getAllTasks.bind(taskController));

/**
 * @swagger
 * /api/v1/tasks/stats:
 *   get:
 *     summary: Get tasks statistics
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/stats', taskController.getTasksStats.bind(taskController));

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       400:
 *         description: Invalid task ID format
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get(
  '/:id',
  validateTaskId,
  taskController.getTaskById.bind(taskController)
);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, COMPLETED]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Validation error or invalid task ID
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put(
  '/:id',
  validateTaskId,
  validateUpdateTask,
  taskController.updateTask.bind(taskController)
);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid task ID format
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id',
  validateTaskId,
  taskController.deleteTask.bind(taskController)
);

module.exports = router;
