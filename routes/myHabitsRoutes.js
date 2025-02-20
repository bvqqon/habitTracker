
const express = require('express');
const router = express.Router();
const habitsController = require('../controller/myHabitsController');

// Route to get habit statistics
router.get('/stats', habitsController.getHabitStats);

module.exports = router;
