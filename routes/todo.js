const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../middleware/authMiddleware')
const { getTodoList, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todo')

router.get('/todo', authMiddleware, getTodoList)
router.get('/todo/:id', authMiddleware, getTodo)
router.post('/todo', authMiddleware, createTodo)
router.put('/todo/:id', authMiddleware, updateTodo)
router.delete('/todo/:id', authMiddleware, deleteTodo)

module.exports = router