const router = require('express').Router();
const TodoController = require('../controller/todo.controller');

router.post('/storeTodo',TodoController.createTodo);

router.get('/getUserTodoList',TodoController.getUserTodo);

router.delete('/deleteTodoEvent',TodoController.deleteTodo);

module.exports = router;