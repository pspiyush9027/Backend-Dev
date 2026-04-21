import express from 'express';

import { protect } from '../middleware/auth.js';
import { createTodo, getTodos, updateTodo, completeTodo, deleteTodo } from '../controller/todo.js';

const router = express.Router();

router
.route('/')
.post(protect, createTodo)
.get(protect, getTodos);

router.
route('/:id')
.put(protect, updateTodo)
.patch(protect, completeTodo)
.delete(protect, deleteTodo);

export default router;