const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getTodoList, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todo')
const { validate } = require('../validators/validator')
const { todoValidationRules } = require('../validators/todoValidateRules')

router.get('/todo', authMiddleware, getTodoList)
router.get('/todo/:id', authMiddleware, getTodo)
router.post('/todo', todoValidationRules(), validate, authMiddleware, createTodo)
router.put('/todo/:id', todoValidationRules(), validate, authMiddleware, updateTodo)
router.delete('/todo/:id', authMiddleware, deleteTodo)

module.exports = router