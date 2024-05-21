const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getTasks, createTask } = require('../controllers/taskController');

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

module.exports = router;
