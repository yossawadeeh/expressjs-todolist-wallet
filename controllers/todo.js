const Todo = require('../models/todo')
const constant = require('../constant/errorMessgae')

exports.getTodoList = async (req, res) => {
    try{
        let user = req.user
        let todoList = await Todo.find({userId: user.user.id})
        res.status(200).send(todoList)
    } catch(err) {
        console.log(err)
        res.status(500).send(constant.INTERNAL_SERVER_ERROR)
    }
}

exports.getTodo = async (req, res) => {
    try{
        let id = req.params.id
        let todo = await Todo.findOne({_id: id})
        if (!todo){
            return res.status(404).send(constant.RECORD_NOTFOUND)
        }

        res.status(200).send(todo)
    }catch (err) {
        console.log(err)
        res.status(500).send(constant.INTERNAL_SERVER_ERROR)
    }
}

exports.createTodo = async (req, res) => {
    try{
        let user = req.user
        let todo = new Todo({
            ...req.body,
            userId: user.user.id
        })

        await todo.save()
        res.status(201).send(todo)
    } catch(err) {
        console.log(err)
        res.status(500).send(constant.INTERNAL_SERVER_ERROR)
    }
}

exports.updateTodo = async (req, res) => {
    try{
        let id = req.params.id

        let todoUpdate = await Todo.findOneAndUpdate({_id: id}, req.body, {new: true})
        res.status(200).send(todoUpdate)
    } catch(err) {
        console.log(err)
        res.status(500).send(constant.INTERNAL_SERVER_ERROR)
    }
}

exports.deleteTodo = async (req, res) => {
    try{
        let id = req.params.id

        let todo = await Todo.findOne({_id: id})
        if (!todo){
            return res.status(404).send(constant.RECORD_NOTFOUND)
        }

        await Todo.deleteOne({_id: id})
        res.status(200).send('Delete successfully.')
    } catch(err) {
        console.log(err)
        res.status(500).send(constant.INTERNAL_SERVER_ERROR)
    }
}