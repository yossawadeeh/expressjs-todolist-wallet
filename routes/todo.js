const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getTodoList, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todo')
const { validate } = require('../validators/validator')
const { todoValidationRules } = require('../validators/todoValidateRules')
const { searchValidateRule } = require('../validators/commonValidateRule')

router.get('/todo', searchValidateRule(), validate, authMiddleware, getTodoList)
router.get('/todo/:id', authMiddleware, getTodo)
router.post('/todo', authMiddleware, todoValidationRules(), validate, createTodo)
router.put('/todo/:id',authMiddleware, todoValidationRules(), validate, updateTodo)
router.delete('/todo/:id', authMiddleware, deleteTodo)

module.exports = router