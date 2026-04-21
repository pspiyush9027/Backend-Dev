import Todo from "../models/todo.js";
import User from "../models/user.js";

export const createTodo = async(req, res) => {
    const {
        title,
        description,
    } = req.body;

    const todo = await Todo.create({
        userId: req.user._id,
        title,
        description
    });

    res.status(201).json(todo);
};

export const getTodos = async(req, res) => {
    const todos = await Todo.find({
        userId: req.user._id
    });

    if (todos.length === 0) {
        return res.status(404)
        .json({
            message: "Todos not found."
        });
    }

    res.json(todos);
};

export const updateTodo = async(req, res) => {
    const {
        title,
        description
    } = req.body;

    const todo = await Todo.findOneAndUpdate(
        {
            userId: req.user._id,
            _id: req.params.id
        },

        {
            title,
            description
        },

        {new: true}
    );

    if (!todo) {
        return res.status(404)
        .json({
            message: "Todo not found."
        });
    }

    res.json(todo);
};

export const completeTodo = async(req, res) => {
    const todo = await Todo.findOneAndUpdate(
        {
            userId: req.user._id,
            _id: req.params.id,
        },

        {status: true},
        {new: true}
    );

    if (!todo) {
        return res.status(404)
        .json({
            message: "Todo not found."
        });
    }

    res.json(todo);
};

export const deleteTodo = async(req, res) => {
    const todo = await Todo.findOneAndDelete(
        {
            userId: req.user._id,
            _id: req.params.id,
        }
    );

    if (!todo) {
        return res.status(404)
        .json({
            message: "Todo not found."
        });
    }

    res.json({
        message: "Todo deleted"
    });
};