const Todo = require("../models/todo");
const constant = require("../constant/errorMessgae");

exports.getTodoList = async (req, res) => {
  try {
    let user = req.user;

    let startDate = req.query.startDate
    let endDate = req.query.endDate
    let search = req.query.search
    let page = parseInt(req.query.page) || 1
    let perPage = parseInt(req.query.perPage) || 10

    if(startDate != null && endDate == null){
        endDate = startDate
    }

    let query = Todo.find()
    query.where({ userId: user.user.id })
    if (startDate != null) {
      query.where("todoDate").gte(startDate).lte(endDate)
    }

    if (search != null){
      query.find({ $or: [{topic: { $regex: search }}, {description: { $regex: search }}]})
    }

    let countQuery = query.clone(); // Clone the query for count
    let count = await countQuery.countDocuments().exec();
    let todoList = await query.sort({todoDate: 1}).skip((page-1) * perPage).limit(perPage).exec()

    let result = {
        items: todoList,
        total: count
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};

exports.getTodo = async (req, res) => {
  try {
    let id = req.params.id;
    let todo = await Todo.findOne({ _id: id });
    if (!todo) {
      return res.status(404).send(constant.RECORD_NOTFOUND);
    }

    let result = {
      item: todo,
    };
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};

exports.createTodo = async (req, res) => {
  try {
    let user = req.user;
    let todo = new Todo({
      ...req.body,
      userId: user.user.id,
    });

    await todo.save();
    let result = {
      item: todo,
    };
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    let id = req.params.id;

    let todoUpdate = await Todo.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    let result = {
      item: todoUpdate,
    };
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    let id = req.params.id;

    let todo = await Todo.findOne({ _id: id });
    if (!todo) {
      return res.status(404).send(constant.RECORD_NOTFOUND);
    }

    await Todo.deleteOne({ _id: id });
    res.status(200).send("Delete successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).send(constant.INTERNAL_SERVER_ERROR);
  }
};
