const Router = require('express').Router;
const router = new Router();
const protect = require('../middlewares/auth-middleware');
const taskController = require('../controllers/taskController');


router.route('/')
.post(protect, taskController.createTask)
.get(protect, taskController.getAllTasks)

router.route('/:id')
.delete(protect, taskController.removeTask)
.put(protect, taskController.updateTask)

module.exports = router;